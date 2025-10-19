import type { CommentFragment } from '@/graphql/generated';
import { mapAuthor } from '@/entities/common/mappers';
import type { Author } from '@/entities/common/models';

export interface Comment {
    id: string;
    body: string;
    bodyHTML: string;
    createdAt: string;
    updatedAt: string;
    author: Author | null;
}

export function mapToComment(node: CommentFragment): Comment {
    return {
        id: node.id,
        body: node.body,
        bodyHTML: node.bodyHTML,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        author: mapAuthor(node.author),
    };
}
