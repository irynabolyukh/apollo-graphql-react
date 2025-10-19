import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/app/config/apolloClient';
import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { ResetStyles } from '@/shared/styles';
import { Suspense } from 'react';
import Loading from '@/shared/ui/loading';

function App() {
    return (
        <>
            <ResetStyles />
            <ApolloProvider client={apolloClient}>
                <Suspense
                    fallback={
                        <Loading
                            fullScreen
                            message="Loading page..."
                        />
                    }
                >
                    <ReactRouterProvider router={router} />
                </Suspense>
            </ApolloProvider>
        </>
    );
}

export default App;
