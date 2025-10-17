import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import {
    GITHUB_CONFIG,
    PAGINATION,
    ISSUE_FILTER_OPTIONS,
    DEFAULT_SORT,
    type IssueFilterOption,
} from '@/app/config/constants';
import { GET_REPOSITORY_ISSUES } from '@/entities/issue/api';
import { mapToIssueListItem, type IssueListItem } from '@/entities/issue/model';
import { IssueCard } from '@/entities/issue/ui';
import type { GetRepositoryIssuesQuery, GetRepositoryIssuesQueryVariables } from '@/graphql/generated';
import Loading from '@/shared/ui/loading';
import Button from '@/shared/ui/button';
import { Filters, Select, SearchInput, IssuesList, EmptyState, LoadMoreContainer } from './IssuesListPage.styles';

export const IssuesListPage = () => {
    const [filterOption, setFilterOption] = useState<IssueFilterOption>('OPEN');
    const [searchQuery, setSearchQuery] = useState('');

    const { data, loading, error, fetchMore } = useQuery<GetRepositoryIssuesQuery, GetRepositoryIssuesQueryVariables>(
        GET_REPOSITORY_ISSUES,
        {
            variables: {
                owner: GITHUB_CONFIG.owner,
                repo: GITHUB_CONFIG.repo,
                first: PAGINATION.DEFAULT_PAGE_SIZE,
                states: filterOption === 'ALL' ? null : [filterOption],
                orderBy: DEFAULT_SORT.ISSUES,
            },
        },
    );

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error loading issues</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    const issues: IssueListItem[] =
        data?.repository?.issues?.edges
            ?.map((edge: any) => edge.node && mapToIssueListItem(edge.node))
            .filter((issue): issue is IssueListItem => issue !== null && issue !== undefined) || [];

    const pageInfo = data?.repository?.issues?.pageInfo;

    const filteredIssues = issues.filter((issue) => {
        if (!searchQuery) return true;
        return (
            issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.bodyText.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleLoadMore = () => {
        if (pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    after: pageInfo.endCursor,
                },
            });
        }
    };

    return (
        <>
            <Filters>
                <Select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value as IssueFilterOption)}
                >
                    <option value={ISSUE_FILTER_OPTIONS.OPEN}>Open</option>
                    <option value={ISSUE_FILTER_OPTIONS.CLOSED}>Closed</option>
                    <option value={ISSUE_FILTER_OPTIONS.ALL}>All</option>
                </Select>

                <SearchInput
                    type="text"
                    placeholder="Search issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Filters>

            {loading && issues.length === 0 ? (
                <Loading message="Loading issues..." />
            ) : (
                <>
                    <IssuesList>
                        {filteredIssues.map((issue) => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                            />
                        ))}
                    </IssuesList>

                    {filteredIssues.length === 0 && searchQuery && (
                        <EmptyState>
                            <p>No issues found matching "{searchQuery}"</p>
                        </EmptyState>
                    )}

                    {pageInfo?.hasNextPage && (
                        <LoadMoreContainer>
                            <Button
                                onClick={handleLoadMore}
                                loading={loading}
                                aria-label="Load more issues"
                            >
                                Load More
                            </Button>
                        </LoadMoreContainer>
                    )}
                </>
            )}
        </>
    );
};
