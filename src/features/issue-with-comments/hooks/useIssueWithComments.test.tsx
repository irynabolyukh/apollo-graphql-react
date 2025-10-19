import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useIssueWithComments } from './useIssueWithComments';
import {
    createApolloWrapper,
    createMockIssue,
    createMockComment,
    createIssueDetailsMock,
} from '@/test/utils/apolloMocks';

describe('useIssueWithComments', () => {
    describe('Core functionality', () => {
        it('should fetch issue with comments', async () => {
            const mockIssue = createMockIssue({ number: 123, title: 'Test Issue' });
            const mockComments = [
                createMockComment({ id: 'c1', body: 'First comment' }),
                createMockComment({ id: 'c2', body: 'Second comment' }),
            ];
            const mocks = [createIssueDetailsMock(mockIssue, mockComments)];

            const { result } = renderHook(() => useIssueWithComments('123'), {
                wrapper: createApolloWrapper(mocks),
            });

            expect(result.current.loading).toBe(true);

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.issue?.title).toBe('Test Issue');
            expect(result.current.initialComments).toHaveLength(2);
            expect(result.current.totalComments).toBe(2);
        });

        it('should handle pagination when more comments exist', async () => {
            const mockIssue = createMockIssue({ number: 100 });
            const mockComments = Array(5)
                .fill(null)
                .map((_, i) => createMockComment({ id: `c${i}` }));

            const mocks = [createIssueDetailsMock(mockIssue, mockComments, true, 'cursor-123')];

            const { result } = renderHook(() => useIssueWithComments('100'), {
                wrapper: createApolloWrapper(mocks),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.commentsPageInfo).toEqual({
                __typename: 'PageInfo',
                hasNextPage: true,
                endCursor: 'cursor-123',
                hasPreviousPage: false,
                startCursor: expect.any(String),
            });
        });

        it('should handle issue with no comments', async () => {
            const mockIssue = createMockIssue({ number: 400 });
            const mocks = [createIssueDetailsMock(mockIssue, [])];

            const { result } = renderHook(() => useIssueWithComments('400'), {
                wrapper: createApolloWrapper(mocks),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.issue).toBeDefined();
            expect(result.current.initialComments).toEqual([]);
            expect(result.current.totalComments).toBe(0);
            expect(result.current.commentsPageInfo?.hasNextPage).toBe(false);
        });
    });

    describe('Edge cases', () => {
        it('should handle non-existent issue (null response)', async () => {
            const { GET_ISSUE_DETAILS } = await import('@/entities/issue/api');

            const errorMock = {
                request: {
                    query: GET_ISSUE_DETAILS,
                    variables: {
                        owner: 'facebook',
                        repo: 'react',
                        number: 99999,
                        commentsOrderBy: { field: 'UPDATED_AT', direction: 'DESC' },
                        commentsAmount: 5,
                    },
                },
                result: {
                    data: {
                        repository: {
                            __typename: 'Repository',
                            id: 'repo-1',
                            issue: null,
                        },
                    },
                },
            };

            const { result } = renderHook(() => useIssueWithComments('99999'), {
                wrapper: createApolloWrapper([errorMock]),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.issue).toBeNull();
            expect(result.current.initialComments).toEqual([]);
        });

        it('should handle network errors', async () => {
            const { GET_ISSUE_DETAILS } = await import('@/entities/issue/api');

            const errorMock = {
                request: {
                    query: GET_ISSUE_DETAILS,
                    variables: {
                        owner: 'facebook',
                        repo: 'react',
                        number: 700,
                        commentsOrderBy: { field: 'UPDATED_AT', direction: 'DESC' },
                        commentsAmount: 5,
                    },
                },
                error: new Error('Network error'),
            };

            const { result } = renderHook(() => useIssueWithComments('700'), {
                wrapper: createApolloWrapper([errorMock]),
            });

            await waitFor(() => expect(result.current.error).toBeDefined());

            expect(result.current.error?.message).toBe('Network error');
            expect(result.current.issue).toBeNull();
        });

        it('should handle deleted users (null author)', async () => {
            const mockIssue = createMockIssue({ number: 500, author: null });
            const mockComments = [createMockComment({ author: null })];

            const mocks = [createIssueDetailsMock(mockIssue, mockComments)];

            const { result } = renderHook(() => useIssueWithComments('500'), {
                wrapper: createApolloWrapper(mocks),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.issue?.author).toBeNull();
            expect(result.current.initialComments[0].author).toBeNull();
        });
    });

    describe('Data mapping', () => {
        it('should map all issue and comment fields correctly', async () => {
            const mockIssue = createMockIssue({
                number: 456,
                title: 'Bug Report',
                state: 'CLOSED',
                closedAt: '2024-01-01T00:00:00Z',
                bodyHTML: '<p>Bug description</p>',
                labels: {
                    __typename: 'LabelConnection',
                    edges: [
                        {
                            node: {
                                __typename: 'Label',
                                id: 'label1',
                                name: 'bug',
                                color: 'ff0000',
                            },
                        },
                    ],
                },
            });

            const mockComments = [
                createMockComment({
                    id: 'comment1',
                    body: 'Great issue!',
                    bodyHTML: '<p>Great issue!</p>',
                    createdAt: '2024-01-01T00:00:00Z',
                    updatedAt: '2024-01-05T00:00:00Z',
                    author: {
                        __typename: 'User',
                        login: 'reviewer',
                        avatarUrl: 'https://avatars.githubusercontent.com/u/999',
                        url: 'https://github.com/reviewer',
                    },
                }),
                createMockComment({
                    author: {
                        __typename: 'Bot',
                        login: 'dependabot',
                        avatarUrl: 'https://avatars.githubusercontent.com/u/bot',
                        url: 'https://github.com/apps/dependabot',
                    },
                }),
            ];

            const mocks = [createIssueDetailsMock(mockIssue, mockComments)];

            const { result } = renderHook(() => useIssueWithComments('456'), {
                wrapper: createApolloWrapper(mocks),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.issue).toMatchObject({
                number: 456,
                title: 'Bug Report',
                state: 'CLOSED',
                closedAt: '2024-01-01T00:00:00Z',
                bodyHTML: '<p>Bug description</p>',
            });
            expect(result.current.issue?.labels).toHaveLength(1);
            expect(result.current.issue?.labels[0].name).toBe('bug');

            expect(result.current.initialComments).toHaveLength(2);
            expect(result.current.initialComments[0]).toMatchObject({
                id: 'comment1',
                body: 'Great issue!',
                bodyHTML: '<p>Great issue!</p>',
                author: { login: 'reviewer' },
            });
            expect(result.current.initialComments[0].createdAt).not.toBe(result.current.initialComments[0].updatedAt);
            expect(result.current.initialComments[1].author?.login).toBe('dependabot');
        });
    });
});
