import type { IssueFilterOption } from '@/app/config/constants';
import { ISSUE_FILTER_OPTIONS } from '@/app/config/constants';
import type { GitHubSearchType, GitHubSearchSort } from '@/shared/lib/github-api/types';

export interface GitHubSearchQueryOptions {
    owner: string;
    repo: string;
    type: GitHubSearchType;
    state: IssueFilterOption;
    searchTerm: string;
    sort?: GitHubSearchSort;
}

/**
 * Builds a GitHub search query string with proper filtering and sorting
 */
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
