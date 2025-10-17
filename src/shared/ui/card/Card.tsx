import styled from 'styled-components';
import { colors, spacing, borderRadius, mediaMax, transition } from '@/shared/styles';

export const Card = styled.div`
    ${transition('border-color')}
    padding: ${spacing.md};
    border: 1px solid ${colors.border.default};
    border-radius: ${borderRadius.lg};
    background-color: ${colors.background.secondary};

    &:hover {
        border-color: ${colors.border.hover};
    }
`;

export const CardLarge = styled(Card)`
    padding: ${spacing.xl};

    ${mediaMax.tablet} {
        padding: ${spacing.md};
    }
`;
