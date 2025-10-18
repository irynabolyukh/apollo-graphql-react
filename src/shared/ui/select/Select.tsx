import { type SelectHTMLAttributes, forwardRef, type ChangeEvent, type ForwardedRef } from 'react';
import { StyledSelect } from './Select.styles';

export type SelectOption<T extends string = string> = {
    label: string;
    value: T;
};

export interface SelectProps<T extends string = string>
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    options: SelectOption<T>[];
    value: T;
    onChange: (value: T) => void;
    fullWidth?: boolean;
}

const SelectInner = <T extends string = string>(
    { options, value, onChange, fullWidth, ...props }: SelectProps<T>,
    ref: ForwardedRef<HTMLSelectElement>,
) => {
    return (
        <StyledSelect
            ref={ref}
            value={value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as T)}
            $fullWidth={fullWidth}
            {...props}
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
};

export const Select = forwardRef(SelectInner) as <T extends string = string>(
    props: SelectProps<T> & { ref?: ForwardedRef<HTMLSelectElement> },
) => ReturnType<typeof SelectInner>;
