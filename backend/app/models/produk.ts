import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kategori from '#models/kategori'

export default class Produk extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare kategoriId: number

  @column()
  declare deskripsi: string | null

  @column()
  declare harga: number

  @column()
  declare stok: number

  @column()
  declare foto: string | null

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}