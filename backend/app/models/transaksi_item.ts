import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Transaksi from '#models/transaksi'
import Produk from '#models/produk'

export default class TransaksiItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare transaksiId: number

  @column()
  declare produkId: number

  @column()
  declare qty: number

  @column()
  declare hargaSatuan: number

  @belongsTo(() => Transaksi)
  declare transaksi: BelongsTo<typeof Transaksi>

  @belongsTo(() => Produk)
  declare produk: BelongsTo<typeof Produk>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}