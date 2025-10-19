import type { DefaultOptions } from '@apollo/client';

export const APOLLO_CONFIG = {
    API_URL: import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com/graphql',
    TOKEN: import.meta.env.VITE_GITHUB_TOKEN,

    DEFAULT_FETCH_POLICY: 'cache-first',
    WATCH_QUERY_FETCH_POLICY: 'cache-and-network',

    CACHE_CONFIG: {
        possibleTypes: {
            Actor: ['Bot', 'EnterpriseUserAccount', 'Mannequin', 'Organization', 'User'] as string[],
        },
    },
} as const;

export const DEFAULT_SORT = {
    ISSUES: {
        field: 'CREATED_AT',
        direction: 'DESC',
    },
    COMMENTS: {
        field: 'UPDATED_AT',
        direction: 'DESC',
    },
} as const;

export const getDefaultOptions = (): DefaultOptions => ({
    watchQuery: {
        fetchPolicy: APOLLO_CONFIG.WATCH_QUERY_FETCH_POLICY,
    },
    query: {
        fetchPolicy: APOLLO_CONFIG.DEFAULT_FETCH_POLICY,
    },
});
