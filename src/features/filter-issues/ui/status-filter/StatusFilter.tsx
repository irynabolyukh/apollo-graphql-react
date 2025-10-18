import { Select, type SelectOption } from '@/shared/ui/select';

export type FilterOption = SelectOption;

interface StatusFilterProps {
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
}

export const StatusFilter = ({ value, onChange, options }: StatusFilterProps) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            options={options}
            aria-label="Filter by status"
        />
    );
};
