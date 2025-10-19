import Input from '@/shared/ui/input';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = 'Search...' }: SearchInputProps) => {
    return (
        <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={placeholder}
            fullWidth
        />
    );
};
