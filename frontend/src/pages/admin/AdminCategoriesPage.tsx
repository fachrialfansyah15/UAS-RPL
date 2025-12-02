import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

export const AdminCategoriesPage: React.FC = () => {
    return (
        <AdminLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Category Management</h1>
                <p>CRUD for categories - TO BE IMPLEMENTED</p>
            </div>
        </AdminLayout>
    );
};
