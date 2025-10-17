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
import { Loading } from '@/shared/ui/loading';
import Button from '@/shared/ui/button';

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
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '30px' }}>
                <h1>
                    {GITHUB_CONFIG.owner}/{GITHUB_CONFIG.repo} - Issues
                </h1>
            </header>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value as IssueFilterOption)}
                    style={{ padding: '8px 12px', fontSize: '14px' }}
                >
                    <option value={ISSUE_FILTER_OPTIONS.OPEN}>Open</option>
                    <option value={ISSUE_FILTER_OPTIONS.CLOSED}>Closed</option>
                    <option value={ISSUE_FILTER_OPTIONS.ALL}>All</option>
                </select>

                <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '8px 12px', fontSize: '14px', flex: 1 }}
                />
            </div>

            {loading && issues.length === 0 ? (
                <Loading message="Loading issues..." />
            ) : (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {filteredIssues.map((issue) => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                            />
                        ))}
                    </div>

                    {filteredIssues.length === 0 && searchQuery && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                            <p>No issues found matching "{searchQuery}"</p>
                        </div>
                    )}

                    {pageInfo?.hasNextPage && (
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Button
                                onClick={handleLoadMore}
                                loading={loading}
                                aria-label="Load more issues"
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    backgroundColor: '#0366d6',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                }}
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
