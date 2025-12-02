import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <span className="text-2xl mr-2">🎣</span>
                            FishingShop
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Toko perlengkapan memancing terlengkap dengan harga terjangkau dan kualitas terbaik.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/catalog" className="hover:text-white transition-colors">Produk</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors">Tentang Kami</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                +62 812-3456-7890
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                info@fishingshop.com
                            </li>
                            <li className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                Jakarta, Indonesia
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; 2024 FishingShop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
