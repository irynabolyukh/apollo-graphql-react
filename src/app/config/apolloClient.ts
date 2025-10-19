import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { APOLLO_CONFIG, getDefaultOptions } from '@/app/config/index.ts';
import { createEdgesMergePolicy } from '@/shared/lib/apollo/apollo-helpers.ts';

if (!APOLLO_CONFIG.TOKEN) {
    throw new Error('Missing VITE_GITHUB_TOKEN. Please create a .env file with your GitHub token.');
}

const httpLink = new HttpLink({
    uri: APOLLO_CONFIG.API_URL,
    headers: {
        authorization: `Bearer ${APOLLO_CONFIG.TOKEN}`,
    },
});
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        possibleTypes: APOLLO_CONFIG.CACHE_CONFIG.possibleTypes,
        typePolicies: {
            Query: {
                fields: {
                    search: {
                        keyArgs: ['query', 'type'],
                        ...createEdgesMergePolicy(),
                    },
                },
            },
            Repository: {
                fields: {
                    issues: {
                        keyArgs: ['states'],
                        ...createEdgesMergePolicy(),
                    },
                },
            },
            Issue: {
                fields: {
                    comments: {
                        keyArgs: ['orderBy'],
                        ...createEdgesMergePolicy(),
                    },
                },
            },
        },
    }),
    defaultOptions: getDefaultOptions(),
});
