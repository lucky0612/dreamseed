import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center";

    const variants = {
        primary: "bg-emerald-water-500 hover:bg-emerald-water-600 text-white shadow-lg hover:shadow-xl disabled:bg-emerald-water-300",
        secondary: "bg-moss-500 hover:bg-moss-600 text-white shadow-lg hover:shadow-xl disabled:bg-moss-300",
        outline: "border-2 border-emerald-water-500 text-emerald-water-500 hover:bg-emerald-water-50 disabled:border-emerald-water-300 disabled:text-emerald-water-300"
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg"
    };

    const spinnerSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className={`${spinnerSizes[size]} border-2 border-current border-t-transparent rounded-full`}
                    />
                    <span>{children}</span>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    {icon && <span>{icon}</span>}
                    <span>{children}</span>
                </div>
            )}
        </motion.button>
    );
};

export default Button;