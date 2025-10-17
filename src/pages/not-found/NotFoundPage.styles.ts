import styled from 'styled-components';
import { colors, fontSizes, spacing, flexColumn } from '@/shared/styles';

export const Container = styled.div`
    ${flexColumn(spacing.md)}
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: ${spacing.lg};
    text-align: center;
`;

export const ErrorCode = styled.h1`
    font-size: ${fontSizes.titleXl};
    margin-bottom: ${spacing.md};
    color: ${colors.text.primary};
`;

export const Title = styled.h2`
    font-size: ${fontSizes.xl};
    margin-bottom: ${spacing.md};
    color: ${colors.text.secondary};
`;

export const Description = styled.p`
    font-size: ${fontSizes.def};
    margin-bottom: ${spacing.lg};
    color: ${colors.text.secondary};
`;
