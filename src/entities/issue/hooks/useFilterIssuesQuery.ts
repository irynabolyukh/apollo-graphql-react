import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_ISSUES } from '../api/queries.ts';
import { GITHUB_CONFIG, PAGINATION, DEFAULT_SORT, type IssueFilterOption, ISSUE_FILTER_OPTIONS } from '@/app/config';
import type { GetRepositoryIssuesQuery, GetRepositoryIssuesQueryVariables } from '@/graphql/generated.ts';

/**
 * Hook for fetching repository issues with filter for states
 */
export const useFilterIssuesQuery = (filterOption: IssueFilterOption, skip = false) => {
    return useQuery<GetRepositoryIssuesQuery, GetRepositoryIssuesQueryVariables>(GET_REPOSITORY_ISSUES, {
        variables: {
            owner: GITHUB_CONFIG.owner,
            repo: GITHUB_CONFIG.repo,
            first: PAGINATION.DEFAULT_PAGE_SIZE,
            states: filterOption === ISSUE_FILTER_OPTIONS.ALL ? null : [filterOption],
            orderBy: DEFAULT_SORT.ISSUES,
        },
        skip,
    });
};
