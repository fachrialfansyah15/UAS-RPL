import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import TransaksiItem from '#models/transaksi_item'

export default class Transaksi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare total: number

  @column()
  declare status: 'pending' | 'completed' | 'cancelled'

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => TransaksiItem)
  declare items: HasMany<typeof TransaksiItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}