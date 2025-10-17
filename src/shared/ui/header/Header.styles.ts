import styled from 'styled-components';
import { colors, spacing, media } from '@/shared/styles';

export const Container = styled.header`
    padding: ${spacing.lg} ${spacing.md};
    border-bottom: 1px solid ${colors.border.default};
    margin-bottom: ${spacing.xl};

    ${media.tablet} {
        padding: ${spacing.xl} ${spacing.lg};
    }
`;
