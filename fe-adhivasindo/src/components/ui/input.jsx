import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
    name,
    label,
    type = 'text',
    placeholder,
    register,
    error,
    required = false,
    rows = 3,
    icon,
    loading = false,
    className,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const getBaseClasses = (hasIcon = false, hasError = false) => {
        return cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            hasError
                ? 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                : '',
            hasIcon || type === 'password' ? 'pr-10' : '',
            'disabled:bg-input/50 disabled:text-muted-foreground',
            className
        );
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="space-y-2 animate-pulse">
                {label && <div className="h-4 bg-muted rounded w-1/3"></div>}
                <div className="h-9 bg-muted rounded-md"></div>
            </div>
        );
    }

    const renderLabel = () =>
        label && (
            <label
                htmlFor={name}
                className="block text-sm font-medium text-foreground mb-1"
            >
                {label}
                {!required && (
                    <span className="text-muted-foreground ml-1">
                        (opsional)
                    </span>
                )}
            </label>
        );

    const renderError = () =>
        error && (
            <p className="text-sm text-destructive mt-1">
                {error.message || error}
            </p>
        );

    const renderPasswordToggle = () =>
        type === 'password' && (
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
            >
                {showPassword ? (
                    <Eye className="h-4 w-4" />
                ) : (
                    <EyeOff className="h-4 w-4" />
                )}
            </button>
        );

    const renderIcon = () =>
        icon &&
        type !== 'password' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                {icon}
            </div>
        );

    // Textarea
    if (type === 'textarea') {
        return (
            <div className="space-y-1">
                {renderLabel()}
                <div className="relative">
                    <textarea
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        rows={rows}
                        data-slot="input"
                        className={cn(
                            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-[60px] w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                            error
                                ? 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                                : '',
                            className
                        )}
                        {...(register ? register(name) : {})}
                        {...props}
                    />
                    {renderIcon()}
                </div>
                {renderError()}
            </div>
        );
    }

    // Default input (text, email, number, password, etc.)
    return (
        <div className="space-y-1">
            {renderLabel()}
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    data-slot="input"
                    className={getBaseClasses(!!icon, !!error)}
                    {...(register ? register(name) : {})}
                    {...props}
                />
                {renderPasswordToggle()}
                {renderIcon()}
            </div>
            {renderError()}
        </div>
    );
};

export { Input };
