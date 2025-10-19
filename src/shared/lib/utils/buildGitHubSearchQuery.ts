import type { IssueFilterOption, GitHubSearchType, GitHubSearchSort } from '@/app/config/constants';
import { ISSUE_FILTER_OPTIONS } from '@/app/config/constants';
import { sanitizeSearchQuery } from './validation';

export interface GitHubSearchQueryOptions {
    owner: string;
    repo: string;
    type: GitHubSearchType;
    state: IssueFilterOption;
    searchTerm: string;
    sort?: GitHubSearchSort;
}

export function buildGitHubSearchQuery({
    owner,
    repo,
    type,
    state,
    searchTerm,
    sort = 'created-desc',
}: GitHubSearchQueryOptions): string {
    const sanitizedSearchTerm = sanitizeSearchQuery(searchTerm);

    const parts = [
        `repo:${owner}/${repo}`,
        `is:${type}`,
        state !== ISSUE_FILTER_OPTIONS.ALL ? `state:${state.toLowerCase()}` : '',
        `sort:${sort}`,
        sanitizedSearchTerm,
    ];

    return parts.filter(Boolean).join(' ');
}
