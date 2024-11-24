import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    helper?: string;
    error?: string;
    type?: 'text' | 'textarea' | 'number' | 'email';
    rows?: number;
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    helper,
    error,
    type = 'text',
    rows = 3,
    icon,
    className = '',
    ...props
}) => {
    const inputStyles = `
    w-full
    px-4
    py-2.5
    rounded-lg
    border-2
    bg-white/50
    backdrop-blur-sm
    transition
    duration-200
    placeholder-forest-400
    text-forest-800
    ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-moss-200 focus:border-emerald-water-400 focus:ring-emerald-water-200'
        }
    focus:outline-none
    focus:ring-2
    ${icon ? 'pl-11' : ''}
    ${className}
  `;

    const labelStyles = "block text-sm font-medium text-forest-700 mb-1";
    const helperStyles = "mt-1 text-sm text-forest-500";
    const errorStyles = "mt-1 text-sm text-red-500";

    const renderInput = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    rows={rows}
                    className={inputStyles}
                    {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
                />
            );
        }

        return (
            <input
                type={type}
                className={inputStyles}
                {...props as React.InputHTMLAttributes<HTMLInputElement>}
            />
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            {label && (
                <label htmlFor={props.id} className={labelStyles}>
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-forest-500">
                        {icon}
                    </div>
                )}
                {renderInput()}
            </div>

            {helper && !error && (
                <p className={helperStyles}>{helper}</p>
            )}

            {error && (
                <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={errorStyles}
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
};

export default Input;