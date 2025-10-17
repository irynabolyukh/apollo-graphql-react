import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/shared/lib/apollo/apolloClient';
import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { router } from '@/routes/router.tsx';
import { ErrorBoundary } from '../shared/providers/error-boundary';
import './App.css';

function App() {
    return (
        <ErrorBoundary>
            <ApolloProvider client={apolloClient}>
                <ReactRouterProvider router={router} />
            </ApolloProvider>
        </ErrorBoundary>
    );
}

export default App;
