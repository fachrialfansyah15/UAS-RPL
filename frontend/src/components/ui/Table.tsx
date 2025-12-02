import React from 'react';
import { cn } from '../../lib/utils';

interface TableProps {
    headers: string[];
    children: React.ReactNode;
    className?: string;
}

export const Table: React.FC<TableProps> = ({ headers, children, className }) => {
    return (
        <div className={cn('overflow-x-auto rounded-lg border border-gray-200', className)}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
            </table>
        </div>
    );
};

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return <tr className={cn('hover:bg-gray-50 transition-colors', className)}>{children}</tr>;
};

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return <td className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)}>{children}</td>;
};
