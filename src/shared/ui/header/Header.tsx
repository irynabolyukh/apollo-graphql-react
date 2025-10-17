import styled from 'styled-components';
import { Container } from './Header.styles';
import Link from '@/shared/ui/link';
import { GITHUB_CONFIG } from '@/app/config/constants';
import { PATHS } from '@/routes/constants';
import { fontSizes, fontWeights, colors, media } from '@/shared/styles';

const LogoLink = styled(Link)`
    font-size: ${fontSizes.xl};
    font-weight: ${fontWeights.bold};
    color: ${colors.text.primary};

    &:hover {
        color: ${colors.text.linkHover};
    }

    ${media.tablet} {
        font-size: ${fontSizes.titleSm};
    }
`;

const Header = () => {
    return (
        <Container>
            <LogoLink
                to={PATHS.home}
                variant="unstyled"
            >
                {`${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo} - Issues`}
            </LogoLink>
        </Container>
    );
};

export default Header;
