import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com/graphql';

if (!GITHUB_TOKEN) {
    throw new Error('Missing VITE_GITHUB_TOKEN. Please create a .env file with your GitHub token.');
}

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: GITHUB_API_URL,
        headers: {
            authorization: `Bearer ${GITHUB_TOKEN}`,
        },
    }),
    cache: new InMemoryCache({
        possibleTypes: {
            Actor: ['Bot', 'EnterpriseUserAccount', 'Mannequin', 'Organization', 'User'],
        },
        typePolicies: {
            Query: {
                fields: {
                    search: {
                        keyArgs: ['query', 'type'], // Cache by search query and type
                        merge(existing, incoming, { args }) {
                            if (!existing) return incoming;
                            if (!args?.after) return incoming; // New search, replace results

                            return {
                                ...incoming,
                                edges: [...(existing.edges || []), ...(incoming.edges || [])],
                            };
                        },
                    },
                },
            },
            Repository: {
                fields: {
                    issues: {
                        keyArgs: ['states'],
                        merge(existing, incoming, { args }) {
                            if (!existing || !args?.after) return incoming;
                            return {
                                ...incoming,
                                edges: [...existing.edges, ...incoming.edges],
                            };
                        },
                    },
                },
            },
        },
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            pollInterval: 60000,
        },
        query: {
            fetchPolicy: 'cache-first',
        },
    },
});
