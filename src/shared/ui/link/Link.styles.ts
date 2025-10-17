import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { colors, fontWeights, transition } from '@/shared/styles';

export type LinkVariant = 'primary' | 'secondary' | 'unstyled';

interface StyledLinkProps {
    $variant?: LinkVariant;
}

const linkVariants = {
    primary: css`
        color: ${colors.text.link};

        &:hover {
            color: ${colors.text.linkHover};
            text-decoration: underline;
        }
    `,
    secondary: css`
        color: ${colors.text.primary};
        font-weight: ${fontWeights.medium};

        &:hover {
            color: ${colors.text.link};
            text-decoration: underline;
        }
    `,
    unstyled: css`
        color: inherit;

        &:hover {
            color: inherit;
        }
    `,
};

const baseLinkStyles = css<StyledLinkProps>`
    ${transition('color', '0.15s')}
    ${({ $variant = 'primary' }) => linkVariants[$variant]}
`;

export const StyledLink = styled(RouterLink)<StyledLinkProps>`
    ${baseLinkStyles}
`;

export const StyledExternalLink = styled.a<StyledLinkProps>`
    ${baseLinkStyles}
`;
