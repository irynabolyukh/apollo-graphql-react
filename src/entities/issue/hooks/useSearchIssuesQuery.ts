import { useQuery } from '@apollo/client/react';
import { SEARCH_ISSUES } from '../api/queries';
import { ISSUE_PAGINATION } from '@/app/config/constants';
import type { SearchIssuesQuery, SearchIssuesQueryVariables } from '@/graphql/generated';

/**
 * Hook for searching issues using GitHub Search API
 */
export const useSearchIssuesQuery = (query: string, skip = false) => {
    return useQuery<SearchIssuesQuery, SearchIssuesQueryVariables>(SEARCH_ISSUES, {
        variables: {
            query,
            type: 'ISSUE',
            first: ISSUE_PAGINATION.DEFAULT_PAGE_SIZE,
        },
        skip,
    });
};
