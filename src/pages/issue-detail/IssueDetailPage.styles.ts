import styled from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, flexColumn } from '@/shared/styles';

export const BackButtonContainer = styled.div`
    margin-bottom: ${spacing.lg};
`;

export const CommentsSection = styled.div`
    margin-top: ${spacing.xl};
`;

export const CommentsTitle = styled.h2`
    margin-bottom: ${spacing.md};
    font-size: ${fontSizes.lg};
    font-weight: ${fontWeights.semibold};
    color: ${colors.text.primary};
`;

export const CommentsList = styled.div`
    ${flexColumn(spacing.md)}
`;

