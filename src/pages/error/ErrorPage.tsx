import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { PATHS } from '@/routes/constants';
import Button from '@/shared/ui/button';
import { Container, ErrorCode, Title, Description, Actions, Details } from './ErrorPage.styles';

export const ErrorPage = () => {
    const error = useRouteError();

    let errorMessage = 'An unexpected error occurred';
    let errorStatus: number | undefined;
    let errorDetails: string | undefined;

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status;
        errorMessage = error.statusText || error.data?.message || errorMessage;
        errorDetails = error.data?.stack;
    } else if (error instanceof Error) {
        errorMessage = error.message;
        errorDetails = error.stack;
    }

    const isDevelopment = import.meta.env.DEV;

    return (
        <Container>
            <ErrorCode>{errorStatus}</ErrorCode>
            <Title>Oops! Something went wrong</Title>
            <Description>{errorMessage}</Description>

            <Actions>
                <Button
                    onClick={() => window.location.reload()}
                    variant="primary"
                >
                    Reload Page
                </Button>
                <Link to={PATHS.home}>
                    <Button variant="secondary">Go to Home</Button>
                </Link>
            </Actions>

            {isDevelopment && errorDetails && (
                <Details>
                    <summary>Error Details (Dev Only)</summary>
                    <pre>{errorDetails}</pre>
                </Details>
            )}
        </Container>
    );
};
