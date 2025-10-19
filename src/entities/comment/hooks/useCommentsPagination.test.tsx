import { describe, it, expect } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCommentsPagination } from './useCommentsPagination';
import { createApolloWrapper, createMockComment, createIssueCommentsMock } from '@/test/utils/apolloMocks';

describe('useCommentsPagination', () => {
    const createInitialComments = (count = 2) =>
        Array(count)
            .fill(null)
            .map((_, i) => ({
                id: `initial-${i}`,
                body: `Initial ${i}`,
                bodyHTML: `<p>Initial ${i}</p>`,
                createdAt: '2024-01-01',
                updatedAt: '2024-01-01',
                author: null,
            }));

    describe('Lazy loading', () => {
        it('should start with initial comments and load more on demand', async () => {
            const initialComments = createInitialComments(2);
            const fetchedComments = [
                createMockComment({ id: 'f1', body: 'Fetched 1' }),
                createMockComment({ id: 'f2', body: 'Fetched 2' }),
            ];
            const mocks = [createIssueCommentsMock(123, fetchedComments, true, 'cursor-1')];

            const { result } = renderHook(() => useCommentsPagination('123', initialComments, true), {
                wrapper: createApolloWrapper(mocks),
            });

            expect(result.current.comments).toEqual(initialComments);
            expect(result.current.loading).toBe(false);
            expect(result.current.hasMore).toBe(true);

            act(() => result.current.loadMore());

            expect(result.current.loading).toBe(true);

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.comments).toHaveLength(2);
            expect(result.current.comments[0].body).toBe('Fetched 1');
            expect(result.current.hasMore).toBe(true);
        });

        it('should stop loading when no more comments exist', async () => {
            const initialComments = createInitialComments(1);
            const fetchedComments = [createMockComment({ id: 'last' })];
            const mocks = [createIssueCommentsMock(123, fetchedComments, false)];

            const { result } = renderHook(() => useCommentsPagination('123', initialComments, true), {
                wrapper: createApolloWrapper(mocks),
            });

            expect(result.current.hasMore).toBe(true);

            act(() => result.current.loadMore());
            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.hasMore).toBe(false);
            expect(result.current.comments).toHaveLength(1);

            const countBefore = result.current.comments.length;
            act(() => result.current.loadMore());
            expect(result.current.comments).toHaveLength(countBefore);
        });

        it('should keep initial comments if fetch returns empty', async () => {
            const initialComments = createInitialComments(2);
            const mocks = [createIssueCommentsMock(123, [], false)];

            const { result } = renderHook(() => useCommentsPagination('123', initialComments, true), {
                wrapper: createApolloWrapper(mocks),
            });

            act(() => result.current.loadMore());
            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.comments).toEqual(initialComments);
            expect(result.current.hasMore).toBe(false);
        });
    });

    describe('Edge cases', () => {
        it('should handle errors gracefully', async () => {
            const { GET_ISSUE_COMMENTS } = await import('@/entities/comment/api/queries');

            const initialComments = createInitialComments(1);
            const errorMock = {
                request: {
                    query: GET_ISSUE_COMMENTS,
                    variables: {
                        owner: 'facebook',
                        repo: 'react',
                        number: 123,
                        first: 10,
                        orderBy: { field: 'UPDATED_AT', direction: 'DESC' },
                    },
                },
                error: new Error('Network error'),
            };

            const { result } = renderHook(() => useCommentsPagination('123', initialComments, true), {
                wrapper: createApolloWrapper([errorMock]),
            });

            act(() => result.current.loadMore());
            await waitFor(() => expect(result.current.error).toBeDefined());

            expect(result.current.error?.message).toBe('Network error');
            expect(result.current.comments).toEqual(initialComments);
        });

        it('should handle empty initial comments with hasMore=false', () => {
            const mocks = [createIssueCommentsMock(123, [])];

            const { result } = renderHook(() => useCommentsPagination('123', [], false), {
                wrapper: createApolloWrapper(mocks),
            });

            expect(result.current.comments).toEqual([]);
            expect(result.current.hasMore).toBe(false);

            act(() => result.current.loadMore());
            expect(result.current.comments).toEqual([]);
        });
    });
});
