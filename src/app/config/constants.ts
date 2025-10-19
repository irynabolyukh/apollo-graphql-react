export const GITHUB_CONFIG = {
    owner: import.meta.env.VITE_GITHUB_OWNER || 'facebook',
    repo: import.meta.env.VITE_GITHUB_REPO || 'react',
} as const;

export const APOLLO_CONFIG = {
    API_URL: import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com/graphql',
    TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
} as const;

export const ISSUE_PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
} as const;

export const COMMENT_PAGINATION = {
    INITIAL: 5,
    PAGE_SIZE: 10,
} as const;

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

export const DEFAULT_SORT = {
    ISSUES: { field: 'CREATED_AT', direction: 'DESC' },
    COMMENTS: { field: 'UPDATED_AT', direction: 'DESC' },
} as const;

export type GitHubSearchType = 'issue' | 'pr';
export type GitHubSearchSort =
    | 'created-desc'
    | 'created-asc'
    | 'updated-desc'
    | 'updated-asc'
    | 'comments-desc'
    | 'comments-asc';
