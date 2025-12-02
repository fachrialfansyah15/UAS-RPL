import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

export const AdminTransactionsPage: React.FC = () => {
    return (
        <AdminLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Transaction Management</h1>
                <p>View all transactions - TO BE IMPLEMENTED</p>
            </div>
        </AdminLayout>
    );
};
