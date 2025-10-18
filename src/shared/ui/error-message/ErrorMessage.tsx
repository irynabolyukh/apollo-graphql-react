import { type ReactNode } from 'react';
import Button from '@/shared/ui/button';
import { Container, Title, Message } from './ErrorMessage.styles';

export interface ErrorMessageProps {
    title: string;
    message?: string;
    error?: Error;
    onRetry?: () => void;
}

/**
 * Extracts error message from error object or uses fallback
 */
const getErrorMessage = (message: string | undefined, error: Error | undefined): string | ReactNode => {
    if (message) return message;

    if (error) {
        if (typeof error === 'object' && 'message' in error && error.message) {
            return error.message;
        }
    }

    return 'An unexpected error occurred. Please try again.';
};

export const ErrorMessage = ({ title = 'Error', error, message, onRetry }: ErrorMessageProps) => {
    const displayMessage = getErrorMessage(message, error);

    return (
        <Container>
            <Title>{title}</Title>
            <Message>{displayMessage}</Message>

            {onRetry && (
                <Button
                    onClick={onRetry}
                    variant="primary"
                >
                    Try Again
                </Button>
            )}
        </Container>
    );
};

export default ErrorMessage;
