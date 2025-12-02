import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

export const AdminDashboard: React.FC = () => {
    return (
        <AdminLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                <p>Dashboard with stats and charts - TO BE IMPLEMENTED</p>
            </div>
        </AdminLayout>
    );
};
