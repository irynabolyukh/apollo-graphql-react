import type { GetIssueDetailsQuery } from '@/graphql/generated';
import { mapAuthor } from '@/entities/common/mappers';
import type { Author } from '@/entities/common/models';

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
    author: Author | null;
}

export function mapToComment(node: CommentNode): Comment {
    return {
        id: node.id,
        body: node.body,
        bodyHTML: node.bodyHTML as string,
        createdAt: node.createdAt as string,
        updatedAt: node.updatedAt as string,
        author: mapAuthor(node.author),
    };
}
