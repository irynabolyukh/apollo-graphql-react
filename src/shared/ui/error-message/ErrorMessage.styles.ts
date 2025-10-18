import styled from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, borderRadius, flexColumn } from '@/shared/styles';

export const Container = styled.div`
    ${flexColumn(spacing.md)}
    padding: ${spacing.xl};
    background-color: ${colors.background.secondary};
    border: 1px solid ${colors.error};
    border-radius: ${borderRadius.lg};
    text-align: center;

    button {
        margin: 0 auto;
    }
`;

export const Title = styled.h2`
    font-size: ${fontSizes.lg};
    font-weight: ${fontWeights.semibold};
    color: ${colors.error};
`;

export const Message = styled.p`
    font-size: ${fontSizes.md};
    color: ${colors.text.secondary};
`;
