import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowRight, Package, TrendingUp, Shield } from 'lucide-react';
import api from '../lib/axios';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                api.get('/produk'),
                api.get('/kategori'),
            ]);
            setFeaturedProducts(productsRes.data.data.slice(0, 4));
            setCategories(categoriesRes.data.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl font-bold mb-6 leading-tight">
                                Perlengkapan Memancing <br />
                                <span className="text-blue-200">Berkualitas Tinggi</span>
                            </h1>
                            <p className="text-xl text-blue-100 mb-8">
                                Temukan berbagai peralatan pancing terbaik untuk pengalaman memancing yang sempurna
                            </p>
                            <div className="flex space-x-4">
                                <Button size="lg" variant="secondary" onClick={() => navigate('/catalog')}>
                                    Lihat Produk
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="text-9xl">🎣</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardBody className="text-center">
                                <Package className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-xl font-bold mb-2">Produk Berkualitas</h3>
                                <p className="text-gray-600">Hanya produk original dari brand terpercaya</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="text-center">
                                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-xl font-bold mb-2">Harga Terjangkau</h3>
                                <p className="text-gray-600">Dapatkan harga terbaik untuk semua produk</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="text-center">
                                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-xl font-bold mb-2">Garansi Resmi</h3>
                                <p className="text-gray-600">Semua produk dilindungi garansi resmi</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Kategori Produk</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Card key={category.id} hover>
                                <div onClick={() => navigate('/catalog')} className="cursor-pointer">
                                    <CardBody className="text-center">
                                        <div className="text-4xl mb-3">
                                            {category.name === 'Joran' && '🎣'}
                                            {category.name === 'Reel' && '⚙️'}
                                            {category.name === 'Umpan' && '🐠'}
                                            {category.name === 'Aksesoris' && '🎒'}
                                        </div>
                                        <h3 className="font-bold text-lg">{category.name}</h3>
                                    </CardBody>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Produk Unggulan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} hover>
                                <img
                                    src={product.foto || 'https://via.placeholder.com/300'}
                                    alt={product.nama}
                                    className="w-full h-48 object-cover"
                                />
                                <CardBody>
                                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.nama}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.deskripsi}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-blue-600">
                                            Rp{' '}
                                            {new Intl.NumberFormat('id-ID').format(product.harga)}
                                        </span>
                                        <Button size="sm" onClick={() => navigate(`/product/${product.id}`)}>
                                            Lihat
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Button onClick={() => navigate('/catalog')}>
                            Lihat Semua Produk
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};
