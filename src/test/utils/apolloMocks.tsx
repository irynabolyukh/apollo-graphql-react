import { MockedProvider } from '@apollo/client/testing/react';
import type { MockedResponse } from '@apollo/client/testing';
import type { ReactNode } from 'react';
import { GET_REPOSITORY_ISSUES, SEARCH_ISSUES, GET_ISSUE_DETAILS } from '@/entities/issue/api/queries';
import { GET_ISSUE_COMMENTS } from '@/entities/comment/api/queries';
import type { GetRepositoryIssuesQuery, SearchIssuesQuery } from '@/graphql/generated';

export function createMockIssue(overrides: Record<string, any> = {}) {
    return {
        __typename: 'Issue' as const,
        id: `issue-${Math.random().toString(36).substr(2, 9)}`,
        number: Math.floor(Math.random() * 1000) + 1,
        title: 'Test Issue',
        state: 'OPEN' as const,
        bodyText: 'Test body description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        url: 'https://github.com/test/repo/issues/1',
        closedAt: null,
        author: {
            __typename: 'User' as const,
            login: 'testuser',
            avatarUrl: 'https://avatars.githubusercontent.com/u/123',
            url: 'https://github.com/testuser',
        },
        labels: {
            __typename: 'LabelConnection' as const,
            edges: [],
        },
        comments: {
            __typename: 'IssueCommentConnection' as const,
            totalCount: 0,
        },
        ...overrides,
    };
}

export function createRepositoryIssuesMock(
    issues: any[] = [],
    hasNextPage = false,
    endCursor: string | null = null,
    states: string[] | null = ['OPEN'],
): MockedResponse<GetRepositoryIssuesQuery> {
    return {
        request: {
            query: GET_REPOSITORY_ISSUES,
            variables: {
                owner: 'facebook',
                repo: 'react',
                first: 20,
                states,
                orderBy: { field: 'CREATED_AT', direction: 'DESC' },
            },
        },
        result: {
            data: {
                repository: {
                    __typename: 'Repository',
                    id: 'repo-1',
                    issues: {
                        __typename: 'IssueConnection',
                        totalCount: issues.length,
                        pageInfo: {
                            __typename: 'PageInfo',
                            hasNextPage,
                            hasPreviousPage: false,
                            startCursor: issues.length > 0 ? 'start' : null,
                            endCursor,
                        },
                        edges: issues.map((issue) => ({
                            __typename: 'IssueEdge' as const,
                            cursor: `cursor-${issue.id}`,
                            node: issue,
                        })),
                    },
                },
            },
        },
    };
}

export function createSearchIssuesMock(
    issues: any[] = [],
    hasNextPage = false,
    endCursor: string | null = null,
    query = 'repo:facebook/react is:issue state:open sort:created-desc',
): MockedResponse<SearchIssuesQuery> {
    return {
        request: {
            query: SEARCH_ISSUES,
            variables: {
                query,
                type: 'ISSUE',
                first: 20,
            },
        },
        result: {
            data: {
                search: {
                    __typename: 'SearchResultItemConnection',
                    issueCount: issues.length,
                    pageInfo: {
                        __typename: 'PageInfo',
                        hasNextPage,
                        hasPreviousPage: false,
                        startCursor: issues.length > 0 ? 'search-start' : null,
                        endCursor,
                    },
                    edges: issues.map((issue) => ({
                        __typename: 'SearchResultItemEdge' as const,
                        cursor: `search-cursor-${issue.id}`,
                        node: issue,
                    })),
                },
            },
        },
    };
}

export function createMockComment(overrides: Record<string, any> = {}) {
    return {
        __typename: 'IssueComment' as const,
        id: `comment-${Math.random().toString(36).substr(2, 9)}`,
        body: 'Test comment body',
        bodyHTML: '<p>Test comment body</p>',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
            __typename: 'User' as const,
            login: 'commenter',
            avatarUrl: 'https://avatars.githubusercontent.com/u/456',
            url: 'https://github.com/commenter',
        },
        ...overrides,
    };
}

export function createIssueDetailsMock(
    issue: any,
    comments: any[] = [],
    hasMoreComments = false,
    endCursor: string | null = null,
): MockedResponse {
    return {
        request: {
            query: GET_ISSUE_DETAILS,
            variables: {
                owner: 'facebook',
                repo: 'react',
                number: issue.number,
                commentsOrderBy: { field: 'UPDATED_AT', direction: 'DESC' },
                commentsAmount: 5,
            },
        },
        result: {
            data: {
                repository: {
                    __typename: 'Repository',
                    id: 'repo-1',
                    issue: {
                        ...issue,
                        comments: {
                            __typename: 'IssueCommentConnection',
                            totalCount: comments.length,
                            pageInfo: {
                                __typename: 'PageInfo',
                                hasNextPage: hasMoreComments,
                                hasPreviousPage: false,
                                startCursor: comments.length > 0 ? 'comment-start' : null,
                                endCursor,
                            },
                            edges: comments.map((comment) => ({
                                __typename: 'IssueCommentEdge' as const,
                                cursor: `comment-cursor-${comment.id}`,
                                node: comment,
                            })),
                        },
                    },
                },
            },
        },
    };
}

export function createIssueCommentsMock(
    issueNumber: number,
    comments: any[] = [],
    hasMoreComments = false,
    endCursor: string | null = null,
    after?: string,
): MockedResponse {
    return {
        request: {
            query: GET_ISSUE_COMMENTS,
            variables: {
                owner: 'facebook',
                repo: 'react',
                number: issueNumber,
                first: 10,
                orderBy: { field: 'UPDATED_AT', direction: 'DESC' },
                ...(after && { after }),
            },
        },
        result: {
            data: {
                repository: {
                    __typename: 'Repository',
                    id: 'repo-1',
                    issue: {
                        __typename: 'Issue',
                        id: `issue-${issueNumber}`,
                        comments: {
                            __typename: 'IssueCommentConnection',
                            totalCount: comments.length,
                            pageInfo: {
                                __typename: 'PageInfo',
                                hasNextPage: hasMoreComments,
                                hasPreviousPage: false,
                                startCursor: comments.length > 0 ? 'comment-start' : null,
                                endCursor,
                            },
                            edges: comments.map((comment) => ({
                                __typename: 'IssueCommentEdge' as const,
                                cursor: `comment-cursor-${comment.id}`,
                                node: comment,
                            })),
                        },
                    },
                },
            },
        },
    };
}

export function createApolloWrapper(mocks: MockedResponse[] = []) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
    };
}
