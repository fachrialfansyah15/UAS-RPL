import type { HttpContext } from '@adonisjs/core/http'
import Kategori from '#models/kategori'

export default class KategoriController {
    /**
     * Get all categories
     */
    async index({ response }: HttpContext) {
        try {
            const kategoris = await Kategori.all()
            return response.json({ data: kategoris })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to fetch categories', error: error.message })
        }
    }

    /**
     * Create new category (Admin only)
     */
    async store({ request, response }: HttpContext) {
        try {
            const { name } = request.only(['name'])
            const kategori = await Kategori.create({ name })

            return response.status(201).json({
                message: 'Category created successfully',
                data: kategori,
            })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to create category', error: error.message })
        }
    }

    /**
     * Update category (Admin only)
     */
    async update({ params, request, response }: HttpContext) {
        try {
            const kategori = await Kategori.findOrFail(params.id)
            const { name } = request.only(['name'])

            kategori.name = name
            await kategori.save()

            return response.json({
                message: 'Category updated successfully',
                data: kategori,
            })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to update category', error: error.message })
        }
    }

    /**
     * Delete category (Admin only)
     */
    async destroy({ params, response }: HttpContext) {
        try {
            const kategori = await Kategori.findOrFail(params.id)
            await kategori.delete()

            return response.json({ message: 'Category deleted successfully' })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to delete category', error: error.message })
        }
    }
}
