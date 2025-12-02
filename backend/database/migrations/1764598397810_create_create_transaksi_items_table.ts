import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaksi_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('transaksi_id').unsigned().references('id').inTable('transaksis').onDelete('CASCADE')
      table.integer('produk_id').unsigned().references('id').inTable('produks').onDelete('CASCADE')
      table.integer('qty').notNullable()
      table.decimal('harga_satuan', 12, 2).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}