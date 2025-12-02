/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const ProdukController = () => import('#controllers/produk_controller')
const KategoriController = () => import('#controllers/kategori_controller')
const TransaksiController = () => import('#controllers/transaksi_controller')

// Public routes
router.get('/', async () => {
    return { message: 'Fishing Equipment Sales API' }
})

// Auth routes
router.group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
}).prefix('/auth')

// Protected routes (require authentication)
router.group(() => {
    // Auth
    router.get('/me', [AuthController, 'me'])
    router.post('/logout', [AuthController, 'logout'])

    // Products (public read)
    router.get('/produk', [ProdukController, 'index'])
    router.get('/produk/:id', [ProdukController, 'show'])

    // Categories (public read)
    router.get('/kategori', [KategoriController, 'index'])

    // Transactions
    router.post('/transaksi', [TransaksiController, 'store'])
    router.get('/transaksi', [TransaksiController, 'index'])
    router.get('/transaksi/:id', [TransaksiController, 'show'])
    router.get('/history', [TransaksiController, 'history'])
}).middleware(middleware.auth())

// Admin only routes
router.group(() => {
    // Product management
    router.post('/produk', [ProdukController, 'store'])
    router.put('/produk/:id', [ProdukController, 'update'])
    router.delete('/produk/:id', [ProdukController, 'destroy'])

    // Category management
    router.post('/kategori', [KategoriController, 'store'])
    router.put('/kategori/:id', [KategoriController, 'update'])
    router.delete('/kategori/:id', [KategoriController, 'destroy'])
}).middleware([middleware.auth(), () => import('#middleware/admin_middleware')])
