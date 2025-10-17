import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    size?: 'small' | 'medium';
    children: ReactNode;
    className?: string;
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            loading,
            disabled = false,
            size = 'medium',
            type = 'button',
            variant = 'primary',
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={loading || disabled}
                aria-busy={loading}
                {...props}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
