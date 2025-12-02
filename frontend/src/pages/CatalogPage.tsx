import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../lib/axios';

export const CatalogPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, searchTerm]);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/kategori');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedCategory) params.append('kategoriId', selectedCategory);
            if (searchTerm) params.append('search', searchTerm);

            const response = await api.get(`/produk?${params.toString()}`);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PublicLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Katalog Produk</h1>

                    {/* Filters */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Input
                                    placeholder="Cari produk..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            options={[
                                { value: '', label: 'Semua Kategori' },
                                ...categories.map(cat => ({ value: cat.id, label: cat.name }))
                            ]}
                        />
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">⏳</div>
                            <p className="text-gray-600">Loading products...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-gray-600 text-lg">Tidak ada produk ditemukan</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Card key={product.id} hover>
                                    <img
                                        src={product.foto || '/placeholder.png'}
                                        alt={product.nama}
                                        className="w-full h-48 object-cover cursor-pointer"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    />
                                    <CardBody>
                                        <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.nama}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{product.kategori?.name}</p>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.deskripsi}</p>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xl font-bold text-blue-600">
                                                Rp {new Intl.NumberFormat('id-ID').format(product.harga)}
                                            </span>
                                            <span className="text-sm text-gray-500">Stok: {product.stok}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="flex-1"
                                                onClick={() => navigate(`/product/${product.id}`)}
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => addToCart(product)}
                                                disabled={product.stok === 0}
                                            >
                                                + Keranjang
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
};
