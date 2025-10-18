import { type InputHTMLAttributes, forwardRef } from 'react';
import { StyledInput } from './Input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ fullWidth, ...props }, ref) => {
    return (
        <StyledInput
            ref={ref}
            $fullWidth={fullWidth}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export default Input;
