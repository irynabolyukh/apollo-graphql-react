import { mapEdges } from '@/shared/lib/apollo/apollo-helpers.ts';
import type { IssueState } from '@/entities/issue/model';
import type { Author, Label } from '@/entities/common/models';
import type { AuthorFragment, LabelFragment, IssueCoreFragment } from '@/graphql/generated';

export const mapAuthor = (author: AuthorFragment | null | undefined): Author | null => {
    if (!author?.login) return null;
    return {
        login: author.login,
        avatarUrl: author.avatarUrl,
        url: author.url,
    };
};

export const mapLabels = (
    labels: { edges?: Array<{ node?: LabelFragment | null } | null | undefined> | null } | null | undefined,
): Label[] => {
    return mapEdges(labels?.edges, (node: LabelFragment) => ({
        id: node.id,
        name: node.name,
        color: node.color,
    }));
};

export const mapCoreIssueFields = (node: IssueCoreFragment) => ({
    id: node.id,
    number: node.number,
    title: node.title,
    state: node.state as IssueState,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
    url: node.url,
});
