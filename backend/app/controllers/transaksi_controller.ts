import type { HttpContext } from '@adonisjs/core/http'
import Transaksi from '#models/transaksi'
import TransaksiItem from '#models/transaksi_item'
import Produk from '#models/produk'
import db from '@adonisjs/lucid/services/db'

export default class TransaksiController {
    /**
     * Get all transactions (Admin: all, User: own transactions)
     */
    async index({ auth, response }: HttpContext) {
        try {
            const user = auth.user!
            let query = Transaksi.query()
                .preload('user')
                .preload('items', (itemsQuery) => {
                    itemsQuery.preload('produk')
                })
                .orderBy('created_at', 'desc')

            // If user is not admin, only show their transactions
            if (user.role !== 'admin') {
                query = query.where('user_id', user.id)
            }

            const transaksis = await query

            return response.json({ data: transaksis })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to fetch transactions', error: error.message })
        }
    }

    /**
     * Get single transaction
     */
    async show({ params, auth, response }: HttpContext) {
        try {
            const user = auth.user!
            let query = Transaksi.query()
                .where('id', params.id)
                .preload('user')
                .preload('items', (itemsQuery) => {
                    itemsQuery.preload('produk')
                })

            // If user is not admin, only show their own transaction
            if (user.role !== 'admin') {
                query = query.where('user_id', user.id)
            }

            const transaksi = await query.firstOrFail()

            return response.json({ data: transaksi })
        } catch (error) {
            return response.status(404).json({ message: 'Transaction not found' })
        }
    }

    /**
     * Create new transaction (checkout)
     */
    async store({ request, auth, response }: HttpContext) {
        const trx = await db.transaction()

        try {
            const user = auth.user!
            const { items } = request.only(['items'])
            // items format: [{ produkId: 1, qty: 2 }, ...]

            if (!items || items.length === 0) {
                return response.status(400).json({ message: 'No items in cart' })
            }

            let total = 0
            const transaksiItems = []

            // Validate stock and calculate total
            for (const item of items) {
                const produk = await Produk.findOrFail(item.produkId)

                if (produk.stok < item.qty) {
                    await trx.rollback()
                    return response.status(400).json({
                        message: `Insufficient stock for ${produk.nama}. Available: ${produk.stok}`,
                    })
                }

                const subtotal = produk.harga * item.qty
                total += subtotal

                transaksiItems.push({
                    produkId: produk.id,
                    qty: item.qty,
                    hargaSatuan: produk.harga,
                })

                // Reduce stock
                produk.stok -= item.qty
                await produk.save()
            }

            // Create transaction
            const transaksi = await Transaksi.create({
                userId: user.id,
                total,
                status: 'completed',
            }, { client: trx })

            // Create transaction items
            for (const item of transaksiItems) {
                await TransaksiItem.create({
                    transaksiId: transaksi.id,
                    ...item,
                }, { client: trx })
            }

            await trx.commit()

            // Load relations
            await transaksi.load('items', (itemsQuery) => {
                itemsQuery.preload('produk')
            })

            return response.status(201).json({
                message: 'Transaction created successfully',
                data: transaksi,
            })
        } catch (error) {
            await trx.rollback()
            return response.status(500).json({ message: 'Failed to create transaction', error: error.message })
        }
    }

    /**
     * Get user's transaction history
     */
    async history({ auth, response }: HttpContext) {
        try {
            const user = auth.user!
            const transaksis = await Transaksi.query()
                .where('user_id', user.id)
                .preload('items', (itemsQuery) => {
                    itemsQuery.preload('produk')
                })
                .orderBy('created_at', 'desc')

            return response.json({ data: transaksis })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to fetch history', error: error.message })
        }
    }
}
