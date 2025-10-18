import styled from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, flexColumn } from '@/shared/styles';

export const Container = styled.div`
    ${flexColumn(spacing.lg)}
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: ${spacing.xl};
    text-align: center;
`;

export const ErrorCode = styled.h1`
    font-size: 96px;
    font-weight: ${fontWeights.bold};
    color: ${colors.error};
    line-height: 1;
`;

export const Title = styled.h2`
    font-size: ${fontSizes.titleXl};
    font-weight: ${fontWeights.semibold};
    color: ${colors.text.primary};
`;

export const Description = styled.p`
    font-size: ${fontSizes.lg};
    color: ${colors.text.secondary};
    max-width: 600px;
`;

export const Actions = styled.div`
    display: flex;
    gap: ${spacing.md};
    margin-top: ${spacing.md};

    a {
        text-decoration: none;
    }
`;

export const Details = styled.details`
    margin-top: ${spacing.xl};
    padding: ${spacing.md};
    background-color: ${colors.background.secondary};
    border-radius: ${spacing.xs};
    text-align: left;
    max-width: 800px;
    width: 100%;

    summary {
        cursor: pointer;
        font-weight: ${fontWeights.semibold};
        color: ${colors.text.secondary};
        margin-bottom: ${spacing.sm};
    }

    pre {
        overflow-x: auto;
        font-size: ${fontSizes.sm};
        color: ${colors.text.tertiary};
        white-space: pre-wrap;
        word-break: break-word;
    }
`;

