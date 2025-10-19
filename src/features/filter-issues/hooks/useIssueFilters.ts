import { useState, useCallback } from 'react';
import { useDebounce } from '@/shared/lib/hooks';
import type { IssueFilterOption } from '@/app/config/constants';
import { ISSUE_FILTER_OPTIONS } from '@/app/config/constants';

const SEARCH_DEBOUNCE_MS = 500;

export const useIssueFilters = (initialFilter: IssueFilterOption = ISSUE_FILTER_OPTIONS.ALL) => {
    const [filterOption, setFilterOption] = useState<IssueFilterOption>(initialFilter);
    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

    const handleFilterChange = useCallback((value: string) => {
        setFilterOption(value as IssueFilterOption);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
    }, []);

    const resetFilters = useCallback(() => {
        setFilterOption(ISSUE_FILTER_OPTIONS.ALL);
        setSearchQuery('');
    }, []);

    return {
        filterOption,
        setFilterOption: handleFilterChange,
        searchQuery,
        debouncedSearchQuery,
        setSearchQuery: handleSearchChange,
        resetFilters,
    };
};
