import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { APOLLO_CONFIG } from '@/app/config/constants';
import { createEdgesMergePolicy } from '@/graphql/helpers';

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
        possibleTypes: {
            Actor: ['Bot', 'EnterpriseUserAccount', 'Mannequin', 'Organization', 'User'] as string[],
        },
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
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
        query: {
            fetchPolicy: 'cache-first',
        },
    },
});
