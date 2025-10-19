import type { IssueListItemFragment, GetIssueDetailsQuery } from '@/graphql/generated';
import { mapCoreIssueFields, mapAuthor, mapLabels } from '@/entities/common/mappers';
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

export const ISSUE_STATE = {
    OPEN: 'OPEN' as IssueState,
    CLOSED: 'CLOSED' as IssueState,
} as const;

export function isValidIssueState(state: string): state is IssueState {
    return state === 'OPEN' || state === 'CLOSED';
}

export function mapToIssueListItem(node: IssueListItemFragment): IssueListItem {
    return {
        ...mapCoreIssueFields(node),
        bodyText: node.bodyText || '',
        author: mapAuthor(node.author),
        labels: mapLabels(node.labels),
        commentsCount: extractTotalCount(node.comments),
    };
}

export function mapToIssueDetail(issue: IssueDetailsNode): IssueDetail {
    return {
        ...mapCoreIssueFields(issue),
        closedAt: issue.closedAt || null,
        body: issue.body,
        bodyHTML: issue.bodyHTML,
        author: mapAuthor(issue.author),
        labels: mapLabels(issue.labels),
        commentsCount: extractTotalCount(issue.comments),
    };
}
