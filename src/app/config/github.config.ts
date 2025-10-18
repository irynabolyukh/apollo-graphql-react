export const GITHUB_CONFIG = {
    owner: import.meta.env.VITE_GITHUB_OWNER || 'facebook',
    repo: import.meta.env.VITE_GITHUB_REPO || 'react',
} as const;

export type GitHubSearchType = 'issue' | 'pr';

export type GitHubSearchSort =
    | 'created-desc'
    | 'created-asc'
    | 'updated-desc'
    | 'updated-asc'
    | 'comments-desc'
    | 'comments-asc'
    | 'reactions-desc'
    | 'reactions-asc'
    | 'interactions-desc'
    | 'interactions-asc';
