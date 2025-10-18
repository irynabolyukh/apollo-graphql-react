import { useMemo } from 'react';
import { GITHUB_CONFIG, type IssueFilterOption } from '@/app/config/constants.ts';
import { buildGitHubSearchQuery } from '@/shared/lib/utils';
import { useFilterIssuesQuery } from './useFilterIssuesQuery.ts';
import { useSearchIssuesQuery } from './useSearchIssuesQuery.ts';
import { mapToIssueListItem, type IssueListItem } from '../model';
import type { IssueEdge, SearchResultItemEdge } from '@/graphql/generated.ts';

/**
 * Orchestration hook that combines regular issues query and search query
 * Automatically switches between them based on search input
 *
 * @returns Issues list with loading state, errors, and pagination
 */
export const useRepositoryIssues = (filterOption: IssueFilterOption, searchQuery: string) => {
    const hasSearchQuery = searchQuery.trim().length > 0;

    const githubSearchQuery = useMemo(() => {
        if (!hasSearchQuery) return '';

        return buildGitHubSearchQuery({
            owner: GITHUB_CONFIG.owner,
            repo: GITHUB_CONFIG.repo,
            type: 'issue',
            state: filterOption,
            searchTerm: searchQuery,
            sort: 'created-desc',
        });
    }, [hasSearchQuery, filterOption, searchQuery]);

    const repoQuery = useFilterIssuesQuery(filterOption, hasSearchQuery);
    const searchQuery_ = useSearchIssuesQuery(githubSearchQuery, !hasSearchQuery);

    const { data: repoData, loading: repoLoading, error: repoError, fetchMore: repoFetchMore } = repoQuery;
    const { data: searchData, loading: searchLoading, error: searchError, fetchMore: searchFetchMore } = searchQuery_;

    const issues = useMemo<IssueListItem[]>(() => {
        if (hasSearchQuery) {
            return (
                searchData?.search?.edges
                    ?.filter(
                        (edge): edge is SearchResultItemEdge & { node: { __typename: 'Issue' } } =>
                            edge?.node?.__typename === 'Issue',
                    )
                    ?.map((edge) => mapToIssueListItem(edge.node as any))
                    .filter((issue): issue is IssueListItem => issue !== null && issue !== undefined) || []
            );
        } else {
            return (
                repoData?.repository?.issues?.edges
                    ?.filter(
                        (edge): edge is IssueEdge & { node: NonNullable<IssueEdge['node']> } =>
                            edge?.node !== null && edge?.node !== undefined,
                    )
                    ?.map((edge) => mapToIssueListItem(edge.node as any))
                    .filter((issue): issue is IssueListItem => issue !== null && issue !== undefined) || []
            );
        }
    }, [hasSearchQuery, searchData?.search?.edges, repoData?.repository?.issues?.edges]);

    const pageInfo = hasSearchQuery ? searchData?.search?.pageInfo : repoData?.repository?.issues?.pageInfo;

    const handleLoadMore = () => {
        if (!pageInfo?.hasNextPage) return;

        if (hasSearchQuery) {
            searchFetchMore({
                variables: {
                    query: githubSearchQuery,
                    type: 'ISSUE',
                    after: pageInfo.endCursor,
                },
            }).catch((err) => {
                console.error('Failed to load more search results:', err);
            });
        } else {
            repoFetchMore({
                variables: {
                    after: pageInfo.endCursor,
                },
            }).catch((err) => {
                console.error('Failed to load more issues:', err);
            });
        }
    };

    return {
        issues,
        loading: hasSearchQuery ? searchLoading : repoLoading,
        error: hasSearchQuery ? searchError : repoError,
        pageInfo,
        handleLoadMore,
        isSearching: hasSearchQuery,
    };
};
