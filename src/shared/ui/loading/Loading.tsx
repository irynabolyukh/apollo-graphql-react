import { Container, Spinner, Message } from './Loading.styles';

interface LoadingProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
}

const Loading = ({ message = 'Loading...', size = 'medium' }: LoadingProps) => {
    const sizeMap = {
        small: { spinner: 24, fontSize: 12 },
        medium: { spinner: 48, fontSize: 14 },
        large: { spinner: 64, fontSize: 16 },
    };

    const { spinner, fontSize } = sizeMap[size];

    return (
        <Container>
            <div>
                <Spinner $size={spinner} />
                {message && <Message $fontSize={fontSize}>{message}</Message>}
            </div>
        </Container>
    );
};

export default Loading;
