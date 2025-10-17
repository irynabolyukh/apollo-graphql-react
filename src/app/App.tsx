import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/shared/lib/apollo/apolloClient';
import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { router } from '@/routes/router.tsx';
import { ErrorBoundary } from '@/shared/providers/error-boundary';
import { ResetStyles } from '@/shared/styles';
import { Suspense } from 'react';
import Loading from '@/shared/ui/loading';

function App() {
    return (
        <ErrorBoundary>
            <ResetStyles />
            <ApolloProvider client={apolloClient}>
                <Suspense fallback={<Loading message="Loading page..." />}>
                    <ReactRouterProvider router={router} />
                </Suspense>
            </ApolloProvider>
        </ErrorBoundary>
    );
}

export default App;
