import type { HttpContext } from '@adonisjs/core/http'
import Produk from '#models/produk'

export default class ProdukController {
    /**
     * Get all products with optional category filter
     */
    async index({ request, response }: HttpContext) {
        try {
            const { kategoriId, search } = request.qs()

            let query = Produk.query().preload('kategori')

            if (kategoriId) {
                query = query.where('kategori_id', kategoriId)
            }

            if (search) {
                query = query.where('nama', 'ILIKE', `%${search}%`)
            }

            const produks = await query.orderBy('created_at', 'desc')

            return response.json({ data: produks })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to fetch products', error: error.message })
        }
    }

    /**
     * Get single product by ID
     */
    async show({ params, response }: HttpContext) {
        try {
            const produk = await Produk.query()
                .where('id', params.id)
                .preload('kategori')
                .firstOrFail()

            return response.json({ data: produk })
        } catch (error) {
            return response.status(404).json({ message: 'Product not found' })
        }
    }

    /**
     * Create new product (Admin only)
     */
    async store({ request, response }: HttpContext) {
        try {
            const data = request.only(['nama', 'kategoriId', 'deskripsi', 'harga', 'stok', 'foto'])

            const produk = await Produk.create(data)
            await produk.load('kategori')

            return response.status(201).json({
                message: 'Product created successfully',
                data: produk,
            })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to create product', error: error.message })
        }
    }

    /**
     * Update product (Admin only)
     */
    async update({ params, request, response }: HttpContext) {
        try {
            const produk = await Produk.findOrFail(params.id)
            const data = request.only(['nama', 'kategoriId', 'deskripsi', 'harga', 'stok', 'foto'])

            produk.merge(data)
            await produk.save()
            await produk.load('kategori')

            return response.json({
                message: 'Product updated successfully',
                data: produk,
            })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to update product', error: error.message })
        }
    }

    /**
     * Delete product (Admin only)
     */
    async destroy({ params, response }: HttpContext) {
        try {
            const produk = await Produk.findOrFail(params.id)
            await produk.delete()

            return response.json({ message: 'Product deleted successfully' })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to delete product', error: error.message })
        }
    }
}
