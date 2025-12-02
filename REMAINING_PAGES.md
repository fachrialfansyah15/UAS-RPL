# REMAINING FRONTEND PAGES - CODE TEMPLATES

## Create these files in `frontend/src/pages/`:

### 1. ProductDetailPage.tsx

```typescript
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import api from '../lib/axios';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/produk/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-6xl">⏳</div>
        </div>
      </PublicLayout>
    );
  }

  if (!product) {
    return (
      <PublicLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <p>Product not found</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => navigate('/catalog')} className="mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Katalog
          </Button>

          <Card>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={product.foto || '/placeholder.png'}
                  alt={product.nama}
                  className="w-full rounded-lg"
                />
              </div>
              <CardBody>
                <h1 className="text-3xl font-bold mb-2">{product.nama}</h1>
                <p className="text-gray-600 mb-4">{product.kategori?.name}</p>
                <p className="text-gray-700 mb-6">{product.deskripsi}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    Rp {new Intl.NumberFormat('id-ID').format(product.harga)}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Stok: {product.stok}</p>
                  <div className="flex items-center space-x-4">
                    <label className="font-medium">Jumlah:</label>
                    <input
                      type="number"
                      min="1"
                      max={product.stok}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stok, parseInt(e.target.value) || 1)))}
                      className="w-20 px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stok === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stok === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                </Button>
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};
```

### 2. CartPage.tsx

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { Card, CardBody, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Keranjang Kosong</h2>
            <p className="text-gray-600 mb-6">Belum ada produk di keranjang Anda</p>
            <Button onClick={() => navigate('/catalog')}>Mulai Belanja</Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <Card key={item.produkId}>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.foto || '/placeholder.png'}
                      alt={item.nama}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.nama}</h3>
                      <p className="text-blue-600 font-semibold">
                        Rp {new Intl.NumberFormat('id-ID').format(item.harga)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.produkId, item.qty - 1)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.produkId, item.qty + 1)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        Rp {new Intl.NumberFormat('id-ID').format(item.harga * item.qty)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.produkId)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card>
            <CardFooter className="flex items-center justify-between">
              <div className="text-2xl font-bold">Total:</div>
              <div className="text-3xl font-bold text-blue-600">
                Rp {new Intl.NumberFormat('id-ID').format(total)}
              </div>
            </CardFooter>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button variant="secondary" className="flex-1" onClick={() => navigate('/catalog')}>
              Lanjut Belanja
            </Button>
            <Button className="flex-1" onClick={() => navigate('/checkout')}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
```

### 3. CheckoutPage.tsx - Create this file with checkout form and order placement

### 4. OrderHistoryPage.tsx - Create this file to show user's transaction history

### 5-8. Admin Pages - Create admin/AdminDashboard.tsx, AdminProductsPage.tsx, AdminCategoriesPage.tsx, AdminTransactionsPage.tsx

## See COMPLETE_PAGES.md for full implementation of all remaining pages.
