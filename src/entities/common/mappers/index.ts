import { mapEdges } from '@/shared/lib/apollo/apollo-helpers.ts';
import type { IssueState } from '@/entities/issue/model';
import type { Author, Label } from '@/entities/common/models';

/**
 * Maps GraphQL author data to domain model
 */
export const mapAuthor = (author: any): Author | null => {
    if (!author?.login) return null;
    return {
        login: author.login,
        avatarUrl: author.avatarUrl,
        url: author.url,
    };
};

/**
 * Maps GraphQL labels to domain model (without description)
 */
export const mapLabels = (labels: any): Label[] => {
    return mapEdges(labels?.edges, (node: Label) => ({
        id: node.id || '',
        name: node.name || '',
        color: node.color || '',
    }));
};

/**
 * Maps core issue fields shared between list and detail views
 */
export const mapCoreIssueFields = (node: any) => ({
    id: node.id,
    number: node.number,
    title: node.title,
    state: node.state as IssueState,
    createdAt: node.createdAt as string,
    updatedAt: node.updatedAt as string,
    url: node.url,
});
