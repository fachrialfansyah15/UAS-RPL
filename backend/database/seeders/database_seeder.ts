import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Kategori from '#models/kategori'
import Produk from '#models/produk'

export default class extends BaseSeeder {
  async run() {
    // Create admin user
    await User.updateOrCreate(
      { email: 'admin@fishing.com' },
      {
        fullName: 'Admin User',
        email: 'admin@fishing.com',
        password: 'admin123',
        role: 'admin',
      }
    )

    // Create regular user
    await User.updateOrCreate(
      { email: 'user@fishing.com' },
      {
        fullName: 'Regular User',
        email: 'user@fishing.com',
        password: 'user123',
        role: 'user',
      }
    )

    // Create categories
    const joran = await Kategori.updateOrCreate(
      { name: 'Joran' },
      { name: 'Joran' }
    )

    const reel = await Kategori.updateOrCreate(
      { name: 'Reel' },
      { name: 'Reel' }
    )

    const umpan = await Kategori.updateOrCreate(
      { name: 'Umpan' },
      { name: 'Umpan' }
    )

    const aksesoris = await Kategori.updateOrCreate(
      { name: 'Aksesoris' },
      { name: 'Aksesoris' }
    )

    // Create products
    await Produk.updateOrCreate(
      { nama: 'Joran Shimano FX 210' },
      {
        nama: 'Joran Shimano FX 210',
        kategoriId: joran.id,
        deskripsi: 'Joran pancing berkualitas tinggi untuk pemula hingga profesional',
        harga: 450000,
        stok: 25,
        foto: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400',
      }
    )

    await Produk.updateOrCreate(
      { nama: 'Reel Daiwa BG 3000' },
      {
        nama: 'Reel Daiwa BG 3000',
        kategoriId: reel.id,
        deskripsi: 'Reel spinning dengan gear ratio tinggi dan body kokoh',
        harga: 850000,
        stok: 15,
        foto: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      }
    )

    await Produk.updateOrCreate(
      { nama: 'Umpan Rapala X-Rap' },
      {
        nama: 'Umpan Rapala X-Rap',
        kategoriId: umpan.id,
        deskripsi: 'Umpan buatan dengan aksi renang realistis',
        harga: 125000,
        stok: 50,
        foto: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=400',
      }
    )

    await Produk.updateOrCreate(
      { nama: 'Tas Pancing Waterproof' },
      {
        nama: 'Tas Pancing Waterproof',
        kategoriId: aksesoris.id,
        deskripsi: 'Tas pancing anti air dengan banyak kompartemen',
        harga: 275000,
        stok: 30,
        foto: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      }
    )

    await Produk.updateOrCreate(
      { nama: 'Joran Daiwa Megaforce' },
      {
        nama: 'Joran Daiwa Megaforce',
        kategoriId: joran.id,
        deskripsi: 'Joran dengan teknologi carbon fiber terbaru',
        harga: 650000,
        stok: 20,
        foto: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400',
      }
    )

    await Produk.updateOrCreate(
      { nama: 'Reel Penn Battle III' },
      {
        nama: 'Reel Penn Battle III',
        kategoriId: reel.id,
        deskripsi: 'Reel heavy duty untuk mancing laut',
        harga: 1200000,
        stok: 10,
        foto: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      }
    )
  }
}