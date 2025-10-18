import { useQuery } from '@apollo/client/react';
import { SEARCH_ISSUES } from '../api/queries.ts';
import { PAGINATION } from '@/app/config';
import type { SearchIssuesQuery, SearchIssuesQueryVariables } from '@/graphql/generated.ts';

/**
 * Hook for searching issues using GitHub Search API
 */
export const useSearchIssuesQuery = (query: string, skip = false) => {
    return useQuery<SearchIssuesQuery, SearchIssuesQueryVariables>(SEARCH_ISSUES, {
        variables: {
            query,
            type: 'ISSUE',
            first: PAGINATION.DEFAULT_PAGE_SIZE,
        },
        skip,
    });
};
