import styled from 'styled-components';
import { spacing, colors, fontSizes, flexColumn, flexCenter } from '@/shared/styles';

export const Container = styled.div`
    ${flexColumn(spacing.md)}
`;

export const LoadMoreButton = styled.div`
    ${flexCenter};
    margin-top: ${spacing.md};
`;

export const ErrorContainer = styled.div`
    ${flexCenter};
    flex-direction: column;
    gap: ${spacing.sm};
    margin-top: ${spacing.md};
    padding: ${spacing.md};
    background-color: ${colors.error}10;
    border: 1px solid ${colors.error}40;
    border-radius: ${spacing.xs};

    p {
        margin: 0;
        color: ${colors.error};
        font-size: ${fontSizes.sm};
        text-align: center;
    }
`;
