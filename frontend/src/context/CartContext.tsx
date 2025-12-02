import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    produkId: number;
    nama: string;
    harga: number;
    qty: number;
    foto: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (produkId: number) => void;
    updateQuantity: (produkId: number, qty: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: any) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.produkId === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.produkId === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { produkId: product.id, nama: product.nama, harga: product.harga, qty: 1, foto: product.foto }];
        });
    };

    const removeFromCart = (produkId: number) => {
        setItems((prev) => prev.filter((item) => item.produkId !== produkId));
    };

    const updateQuantity = (produkId: number, qty: number) => {
        if (qty <= 0) {
            removeFromCart(produkId);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.produkId === produkId ? { ...item, qty } : item))
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + item.harga * item.qty, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
