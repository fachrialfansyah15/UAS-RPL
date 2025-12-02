import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.integer('kategori_id').unsigned().references('id').inTable('kategoris').onDelete('CASCADE')
      table.text('deskripsi').nullable()
      table.decimal('harga', 12, 2).notNullable()
      table.integer('stok').notNullable().defaultTo(0)
      table.string('foto').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}