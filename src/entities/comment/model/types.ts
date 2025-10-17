import type { GetIssueDetailsQuery } from '@/graphql/generated';

type CommentEdge = NonNullable<
    NonNullable<NonNullable<GetIssueDetailsQuery['repository']>['issue']>['comments']['edges']
>[number];

type CommentNode = NonNullable<NonNullable<CommentEdge>['node']>;

export interface Comment {
    id: string;
    body: string;
    bodyHTML: string;
    createdAt: string;
    updatedAt: string;
    author: {
        login: string;
        avatarUrl: string;
        url: string;
    } | null;
}

export function mapToComment(node: CommentNode): Comment {
    return {
        id: node.id,
        body: node.body,
        bodyHTML: node.bodyHTML as string,
        createdAt: node.createdAt as string,
        updatedAt: node.updatedAt as string,
        author: node.author
            ? {
                  login: node.author.login,
                  avatarUrl: node.author.avatarUrl as string,
                  url: node.author.url as string,
              }
            : null,
    };
}
