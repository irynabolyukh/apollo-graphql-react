import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { APOLLO_CONFIG } from '@/app/config/constants';

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
                    search: relayStylePagination(['query', 'type']),
                },
            },
            Repository: {
                fields: {
                    issues: relayStylePagination(['states']),
                },
            },
            Issue: {
                fields: {
                    comments: relayStylePagination(['orderBy']),
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
