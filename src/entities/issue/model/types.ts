import type { GetRepositoryIssuesQuery, GetIssueDetailsQuery } from '@/graphql/generated';

type IssueEdge = NonNullable<NonNullable<GetRepositoryIssuesQuery['repository']>['issues']['edges']>[number];

type IssueNode = NonNullable<NonNullable<IssueEdge>['node']>;

type IssueDetailsNode = NonNullable<NonNullable<GetIssueDetailsQuery['repository']>['issue']>;

export interface IssueListItem {
    id: string;
    number: number;
    title: string;
    state: IssueState;
    createdAt: string;
    updatedAt: string;
    url: string;
    bodyText: string;
    author: {
        login: string;
        avatarUrl: string;
        url: string;
    } | null;
    labels: Array<{
        id: string;
        name: string;
        color: string;
    }>;
    commentsCount: number;
}

export interface IssueDetail {
    id: string;
    number: number;
    title: string;
    state: IssueState;
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    url: string;
    body: string;
    bodyHTML: string;
    author: {
        login: string;
        avatarUrl: string;
        url: string;
    } | null;
    labels: Array<{
        id: string;
        name: string;
        color: string;
        description: string | null;
    }>;
    commentsCount: number;
}

export type IssueState = 'OPEN' | 'CLOSED';

export const ISSUE_STATE = {
    OPEN: 'OPEN' as IssueState,
    CLOSED: 'CLOSED' as IssueState,
} as const;

export function isValidIssueState(state: string): state is IssueState {
    return state === 'OPEN' || state === 'CLOSED';
}

export function mapToIssueListItem(node: IssueNode): IssueListItem {
    return {
        id: node.id,
        number: node.number,
        title: node.title,
        state: node.state as IssueState,
        createdAt: node.createdAt as string,
        updatedAt: node.updatedAt as string,
        url: node.url as string,
        bodyText: node.bodyText || '',
        author: node.author && node.author.login
            ? {
                  login: node.author.login,
                  avatarUrl: node.author.avatarUrl as string,
                  url: node.author.url as string,
              }
            : null,
        labels:
            node.labels?.edges?.map((edge) => ({
                id: edge?.node?.id || '',
                name: edge?.node?.name || '',
                color: edge?.node?.color || '',
            })) || [],
        commentsCount: node.comments?.totalCount ?? 0,
    };
}

export function mapToIssueDetail(issue: IssueDetailsNode): IssueDetail {
    return {
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state as IssueState,
        createdAt: issue.createdAt as string,
        updatedAt: issue.updatedAt as string,
        closedAt: (issue.closedAt as string) || null,
        url: issue.url as string,
        body: issue.body || '',
        bodyHTML: issue.bodyHTML as string,
        author: issue.author && issue.author.login
            ? {
                  login: issue.author.login,
                  avatarUrl: issue.author.avatarUrl as string,
                  url: issue.author.url as string,
              }
            : null,
        labels:
            issue.labels?.edges?.map((edge) => ({
                id: edge?.node?.id || '',
                name: edge?.node?.name || '',
                color: edge?.node?.color || '',
                description: edge?.node?.description || null,
            })) || [],
        commentsCount: issue.comments?.totalCount ?? 0,
    };
}
