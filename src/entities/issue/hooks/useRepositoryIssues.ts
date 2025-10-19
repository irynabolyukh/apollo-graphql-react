import { useMemo, useCallback } from 'react';
import { type IssueFilterOption, GITHUB_CONFIG } from '@/app/config';
import { buildGitHubSearchQuery } from '@/shared/lib/utils';
import { useFilterIssuesQuery } from './useFilterIssuesQuery';
import { useSearchIssuesQuery } from './useSearchIssuesQuery';
import { mapToIssueListItem, type IssueListItem } from '../model';
import { extractEdges, extractPageInfo, hasTypename, isNonNull } from '@/shared/lib/apollo/apollo-helpers';

/**
 * Main hook for fetching repository issues with filtering and search
 * Automatically switches between filter and search queries based on input
 *
 * @param filterOption - Filter by issue state
 * @param searchQuery - Search term for filtering issues (debounced)
 * @returns Issues list with loading state, errors, and pagination handlers
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

    const {
        data: repoData,
        loading: repoLoading,
        error: repoError,
        fetchMore: repoFetchMore,
    } = useFilterIssuesQuery(filterOption, hasSearchQuery);
    const {
        data: searchData,
        loading: searchLoading,
        error: searchError,
        fetchMore: searchFetchMore,
    } = useSearchIssuesQuery(githubSearchQuery, !hasSearchQuery);

    const issues: IssueListItem[] = useMemo<IssueListItem[]>(() => {
        if (hasSearchQuery) {
            const searchEdges = searchData?.search?.edges || [];
            return searchEdges
                .filter((edge: any) => edge?.node && hasTypename(edge.node, 'Issue'))
                .map((edge: any) => mapToIssueListItem(edge.node))
                .filter(isNonNull);
        } else {
            const issueNodes = extractEdges(repoData?.repository?.issues?.edges as any);
            return issueNodes.map((node: any) => mapToIssueListItem(node)).filter(isNonNull);
        }
    }, [hasSearchQuery, searchData?.search?.edges, repoData?.repository?.issues?.edges]);

    const pageInfo = hasSearchQuery
        ? extractPageInfo(searchData?.search)
        : extractPageInfo(repoData?.repository?.issues);

    const handleLoadMore = useCallback(() => {
        if (!pageInfo?.hasNextPage) return;

        if (hasSearchQuery) {
            searchFetchMore({
                variables: {
                    query: githubSearchQuery,
                    type: 'ISSUE' as const,
                    after: pageInfo.endCursor,
                },
            });
        } else {
            repoFetchMore({
                variables: {
                    after: pageInfo.endCursor,
                },
            });
        }
    }, [hasSearchQuery, pageInfo, searchFetchMore, repoFetchMore, githubSearchQuery]);

    return {
        issues,
        loading: hasSearchQuery ? searchLoading : repoLoading,
        error: hasSearchQuery ? searchError : repoError,
        pageInfo,
        handleLoadMore,
        isSearching: hasSearchQuery,
    };
};
