import { PATHS } from '@/routes/constants';
import { Container, ErrorCode, Title, Description } from './NotFoundPage.styles';
import Link from '@/shared/ui/link';

export const NotFoundPage = () => {
    return (
        <Container>
            <ErrorCode>404</ErrorCode>
            <Title>Page Not Found</Title>
            <Description>The page you're looking for doesn't exist or has been moved.</Description>
            <Link to={PATHS.home}>Go to Home</Link>
        </Container>
    );
};
