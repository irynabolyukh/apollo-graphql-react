import { useQuery } from '@apollo/client/react';
import { SEARCH_ISSUES } from '../api/queries.ts';
import { PAGINATION } from '@/app/config/constants.ts';
import type { SearchIssuesQuery, SearchIssuesQueryVariables } from '@/graphql/generated.ts';

/**
 * Hook for searching issues using GitHub Search API
 * @param query - GitHub search query (e.g., "repo:owner/name state:open search term")
 * @param skip - Skip query execution
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
