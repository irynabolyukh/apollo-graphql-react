import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRepositoryIssues } from './useRepositoryIssues';
import {
    createApolloWrapper,
    createRepositoryIssuesMock,
    createSearchIssuesMock,
    createMockIssue,
} from '@/test/utils/apolloMocks';

describe('useRepositoryIssues', () => {
    describe('Filter mode', () => {
        it('should fetch filtered issues by state', async () => {
            const openIssues = [
                createMockIssue({ title: 'Open Issue 1', state: 'OPEN', number: 1 }),
                createMockIssue({ title: 'Open Issue 2', state: 'OPEN', number: 2 }),
            ];
            const closedIssues = [
                createMockIssue({ title: 'Closed Issue', state: 'CLOSED', closedAt: '2024-01-01T00:00:00Z' }),
            ];

            const openMock = createRepositoryIssuesMock(openIssues, true, 'cursor-open', ['OPEN']);
            const closedMock = createRepositoryIssuesMock(closedIssues, false, null, ['CLOSED']);

            const { result: openResult } = renderHook(() => useRepositoryIssues('OPEN', ''), {
                wrapper: createApolloWrapper([openMock]),
            });

            expect(openResult.current.loading).toBe(true);
            expect(openResult.current.isSearching).toBe(false);

            await waitFor(() => expect(openResult.current.loading).toBe(false));

            expect(openResult.current.issues).toHaveLength(2);
            expect(openResult.current.issues[0].title).toBe('Open Issue 1');
            expect(openResult.current.pageInfo).toMatchObject({
                hasNextPage: true,
                endCursor: 'cursor-open',
            });

            const { result: closedResult } = renderHook(() => useRepositoryIssues('CLOSED', ''), {
                wrapper: createApolloWrapper([closedMock]),
            });

            await waitFor(() => expect(closedResult.current.loading).toBe(false));

            expect(closedResult.current.issues).toHaveLength(1);
            expect(closedResult.current.issues[0].state).toBe('CLOSED');
        });

        it('should treat whitespace-only search as filter mode', async () => {
            const mockIssues = [createMockIssue({ title: 'Filtered Issue' })];
            const mocks = [createRepositoryIssuesMock(mockIssues)];

            const { result } = renderHook(() => useRepositoryIssues('OPEN', '   '), {
                wrapper: createApolloWrapper(mocks),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.isSearching).toBe(false);
            expect(result.current.issues).toHaveLength(1);
        });
    });

    describe('Search mode', () => {
        it('should search issues and respect filter state', async () => {
            const openSearchIssues = [createMockIssue({ title: 'Bug in open state' })];
            const closedSearchIssues = [createMockIssue({ title: 'Fixed bug', state: 'CLOSED' })];
            const allSearchIssues = [
                createMockIssue({ title: 'Open bug', state: 'OPEN' }),
                createMockIssue({ title: 'Closed bug', state: 'CLOSED' }),
            ];

            const openQuery = 'repo:facebook/react is:issue state:open sort:created-desc bug';
            const closedQuery = 'repo:facebook/react is:issue state:closed sort:created-desc bug';
            const allQuery = 'repo:facebook/react is:issue sort:created-desc bug';

            const openMock = createSearchIssuesMock(openSearchIssues, true, 'search-cursor', openQuery);
            const closedMock = createSearchIssuesMock(closedSearchIssues, false, null, closedQuery);
            const allMock = createSearchIssuesMock(allSearchIssues, false, null, allQuery);

            const { result: openResult } = renderHook(() => useRepositoryIssues('OPEN', 'bug'), {
                wrapper: createApolloWrapper([openMock]),
            });

            expect(openResult.current.isSearching).toBe(true);
            await waitFor(() => expect(openResult.current.loading).toBe(false));

            expect(openResult.current.issues).toHaveLength(1);
            expect(openResult.current.issues[0].title).toBe('Bug in open state');
            expect(openResult.current.pageInfo).toMatchObject({
                hasNextPage: true,
                endCursor: 'search-cursor',
            });

            const { result: closedResult } = renderHook(() => useRepositoryIssues('CLOSED', 'bug'), {
                wrapper: createApolloWrapper([closedMock]),
            });

            await waitFor(() => expect(closedResult.current.loading).toBe(false));
            expect(closedResult.current.issues[0].title).toBe('Fixed bug');

            const { result: allResult } = renderHook(() => useRepositoryIssues('ALL', 'bug'), {
                wrapper: createApolloWrapper([allMock]),
            });

            await waitFor(() => expect(allResult.current.loading).toBe(false));
            expect(allResult.current.issues).toHaveLength(2);
        });

        it('should filter out non-Issue types from search results', async () => {
            const mixedResults = [
                createMockIssue({ title: 'Real Issue 1' }),
                { __typename: 'PullRequest' as const, id: 'pr-1', title: 'PR' },
                createMockIssue({ title: 'Real Issue 2' }),
                { __typename: 'Discussion' as const, id: 'disc-1', title: 'Discussion' },
            ];

            const query = 'repo:facebook/react is:issue state:open sort:created-desc test';
            const mocks = [createSearchIssuesMock(mixedResults, false, null, query)];

            const { result } = renderHook(() => useRepositoryIssues('OPEN', 'test'), {
                wrapper: createApolloWrapper(mocks),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.issues).toHaveLength(2);
            expect(result.current.issues.every((issue) => issue.title.includes('Real Issue'))).toBe(true);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty results in both modes', async () => {
            const filterQuery = 'repo:facebook/react is:issue state:open sort:created-desc none';

            const filterMock = createRepositoryIssuesMock([]);
            const searchMock = createSearchIssuesMock([], false, null, filterQuery);

            const { result: filterResult } = renderHook(() => useRepositoryIssues('OPEN', ''), {
                wrapper: createApolloWrapper([filterMock]),
            });

            await waitFor(() => expect(filterResult.current.loading).toBe(false));

            expect(filterResult.current.issues).toEqual([]);
            expect(filterResult.current.pageInfo?.hasNextPage).toBe(false);
            expect(filterResult.current.isSearching).toBe(false);

            const { result: searchResult } = renderHook(() => useRepositoryIssues('OPEN', 'none'), {
                wrapper: createApolloWrapper([searchMock]),
            });

            await waitFor(() => expect(searchResult.current.loading).toBe(false));

            expect(searchResult.current.issues).toEqual([]);
            expect(searchResult.current.isSearching).toBe(true);
        });
    });
});
