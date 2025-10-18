import { type ReactNode } from 'react';
import Button from '@/shared/ui/button';
import { Container, Title, Message } from './ErrorMessage.styles';

export interface ErrorMessageProps {
    title?: string;
    message: string | ReactNode;
    onRetry?: () => void;
}

export const ErrorMessage = ({ title = 'Error', message, onRetry }: ErrorMessageProps) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Message>{message}</Message>

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
