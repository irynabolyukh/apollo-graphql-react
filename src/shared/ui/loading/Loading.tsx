import { Container, Content, Spinner, Message, type LoadingSize } from './Loading.styles';

interface LoadingProps {
    message?: string;
    size?: LoadingSize;
    fullScreen?: boolean;
}

const Loading = ({ message = 'Loading...', size = 'medium', fullScreen = false }: LoadingProps) => {
    return (
        <Container $fullScreen={fullScreen} role="status" aria-live="polite" aria-label={message}>
            <Content>
                <Spinner $size={size} aria-hidden="true" />
                {message && <Message $size={size}>{message}</Message>}
            </Content>
        </Container>
    );
};

export default Loading;
