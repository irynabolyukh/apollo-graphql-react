import type { IssueFilterOption, GitHubSearchType, GitHubSearchSort } from '@/app/config/constants';
import { ISSUE_FILTER_OPTIONS } from '@/app/config/constants';

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
    const parts = [
        `repo:${owner}/${repo}`,
        `is:${type}`,
        state !== ISSUE_FILTER_OPTIONS.ALL ? `state:${state.toLowerCase()}` : '',
        `sort:${sort}`,
        searchTerm.trim(),
    ];

    return parts.filter(Boolean).join(' ');
}
