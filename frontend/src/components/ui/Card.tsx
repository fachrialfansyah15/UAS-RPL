import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
    return (
        <div
            className={cn(
                'bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300',
                hover && 'hover:shadow-xl hover:scale-105',
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={cn('p-6 border-b border-gray-200', className)}>{children}</div>;
};

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={cn('p-6', className)}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={cn('p-6 border-t border-gray-200 bg-gray-50', className)}>{children}</div>;
};
