import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'info';
    className?: string;
    elevation?: 'none' | 'sm' | 'md' | 'lg';
    isInteractive?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    children,
    variant = 'default',
    className = '',
    elevation = 'md',
    isInteractive = false,
    onClick
}) => {
    const baseStyles = "rounded-2xl backdrop-blur-sm transition-all duration-200";

    const variants = {
        default: "bg-white/80",
        success: "bg-moss-50/90",
        warning: "bg-amber-50/90",
        info: "bg-emerald-water-50/90"
    };

    const elevations = {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg"
    };

    const cardContent = (
        <div
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${elevations[elevation]}
        ${isInteractive ? 'cursor-pointer hover:shadow-lg' : ''}
        ${className}
      `}
        >
            {(title || subtitle) && (
                <div className="p-4 border-b border-forest-100">
                    {title && (
                        <h3 className="text-lg font-medium text-forest-800">{title}</h3>
                    )}
                    {subtitle && (
                        <p className="mt-1 text-sm text-forest-600">{subtitle}</p>
                    )}
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
        </div>
    );

    if (isInteractive) {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
            >
                {cardContent}
            </motion.div>
        );
    }

    return cardContent;
};

export default Card;