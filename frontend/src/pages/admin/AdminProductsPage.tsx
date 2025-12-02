import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

export const AdminProductsPage: React.FC = () => {
    return (
        <AdminLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Product Management</h1>
                <p>CRUD for products - TO BE IMPLEMENTED</p>
            </div>
        </AdminLayout>
    );
};
