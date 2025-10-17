import { StyledButton, type ButtonVariant, type ButtonSize } from './Button.styles';

import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
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
            fullWidth,
            type = 'button',
            variant = 'primary',
            ...props
        },
        ref,
    ) => {
        return (
            <StyledButton
                ref={ref}
                type={type}
                disabled={loading || disabled}
                aria-busy={loading}
                $variant={variant}
                $size={size}
                $fullWidth={fullWidth}
                {...props}
            >
                {children}
            </StyledButton>
        );
    },
);

Button.displayName = 'Button';

export default Button;
