import { IssueCard } from '@/entities/issue/ui';
import { useRepositoryIssues } from '@/entities/issue/hooks';
import { useIssueFilters } from '@/features/filter-issues/hooks';
import { ISSUE_STATUS_FILTER_OPTIONS } from '@/features/filter-issues/config';
import { SearchInput } from '@/features/search-issues/ui/search-input';
import { StatusFilter } from '@/features/filter-issues/ui/status-filter';
import Loading from '@/shared/ui/loading';
import Button from '@/shared/ui/button';
import ErrorMessage from '@/shared/ui/error-message';
import { Filters, IssuesList, EmptyState, LoadMoreContainer } from './IssuesListPage.styles';

export const IssuesListPage = () => {
    const { filterOption, resetFilters, setFilterOption, searchQuery, debouncedSearchQuery, setSearchQuery } =
        useIssueFilters();
    const { issues, loading, error, pageInfo, handleLoadMore, isSearching } = useRepositoryIssues(
        filterOption,
        debouncedSearchQuery,
    );

    if (error) {
        return (
            <ErrorMessage
                title="Error Loading Issues"
                error={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <>
            <Filters>
                <StatusFilter
                    value={filterOption}
                    onChange={setFilterOption}
                    options={ISSUE_STATUS_FILTER_OPTIONS}
                    aria-label="Filter issues by status"
                />
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search issues..."
                />
                <Button
                    size="small"
                    onClick={resetFilters}
                >
                    X
                </Button>
            </Filters>

            {loading && issues.length === 0 ? (
                <Loading message={isSearching ? 'Searching issues...' : 'Loading issues...'} />
            ) : (
                <>
                    <IssuesList>
                        {issues.map((issue) => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                            />
                        ))}
                    </IssuesList>

                    {issues.length === 0 && debouncedSearchQuery && (
                        <EmptyState>
                            <p>No issues found matching "{debouncedSearchQuery}"</p>
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
