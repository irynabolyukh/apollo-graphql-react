export const ISSUE_FILTER_OPTIONS = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
    ALL: 'ALL',
} as const;

export type IssueFilterOption = keyof typeof ISSUE_FILTER_OPTIONS;

export const ISSUE_FILTER_LABELS: Record<IssueFilterOption, string> = {
    OPEN: 'Open',
    CLOSED: 'Closed',
    ALL: 'All',
} as const;

