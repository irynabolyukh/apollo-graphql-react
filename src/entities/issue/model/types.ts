import type { IssueListItemFragment, GetIssueDetailsQuery } from '@/graphql/generated';
import { mapAuthor, mapLabels } from '@/entities/common/mappers';
import type { Author, Label } from '@/entities/common/models';
import { extractTotalCount } from '@/graphql/helpers';

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
    author: Author | null;
    labels: Array<Label>;
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
    author: Author | null;
    labels: Array<Label>;
    commentsCount: number;
}

export type IssueState = 'OPEN' | 'CLOSED';

export function mapToIssueListItem(node: IssueListItemFragment): IssueListItem {
    return {
        id: node.id,
        number: node.number,
        title: node.title,
        state: node.state as IssueState,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        url: node.url,
        bodyText: node.bodyText,
        author: mapAuthor(node.author),
        labels: mapLabels(node.labels),
        commentsCount: extractTotalCount(node.comments),
    };
}

export function mapToIssueDetail(issue: IssueDetailsNode): IssueDetail {
    return {
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state as IssueState,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
        url: issue.url,
        closedAt: issue.closedAt || null,
        body: issue.body,
        bodyHTML: issue.bodyHTML,
        author: mapAuthor(issue.author),
        labels: mapLabels(issue.labels),
        commentsCount: extractTotalCount(issue.comments),
    };
}
