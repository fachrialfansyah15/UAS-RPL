import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
    const { user, logout, isAdmin } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-2xl">🎣</div>
                        <span className="text-white text-xl font-bold">FishingShop</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-white hover:text-blue-200 transition-colors font-medium">
                            Home
                        </Link>
                        <Link to="/catalog" className="text-white hover:text-blue-200 transition-colors font-medium">
                            Produk
                        </Link>
                        {user && (
                            <Link to="/history" className="text-white hover:text-blue-200 transition-colors font-medium">
                                Pesanan
                            </Link>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {isAdmin && (
                                    <Button
                                        variant="ghost"
                                        className="text-white hover:bg-blue-700"
                                        onClick={() => navigate('/admin')}
                                    >
                                        <LayoutDashboard className="w-5 h-5 mr-2" />
                                        Dashboard
                                    </Button>
                                )}

                                {!isAdmin && (
                                    <Link to="/cart" className="relative text-white hover:text-blue-200 transition-colors">
                                        <ShoppingCart className="w-6 h-6" />
                                        {items.length > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {items.length}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                <div className="flex items-center space-x-2 text-white">
                                    <User className="w-5 h-5" />
                                    <span>{user.fullName}</span>
                                </div>

                                <Button variant="ghost" className="text-white hover:bg-blue-700" onClick={handleLogout}>
                                    <LogOut className="w-5 h-5" />
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Button variant="ghost" className="text-white hover:bg-blue-700" onClick={() => navigate('/login')}>
                                    Login
                                </Button>
                                <Button variant="secondary" onClick={() => navigate('/register')}>
                                    Register
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
