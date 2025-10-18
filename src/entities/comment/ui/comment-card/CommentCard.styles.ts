import styled from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, flexRow, circularAvatar } from '@/shared/styles';

export const TopContent = styled.div`
    ${flexRow(spacing.xs)}
    margin-bottom: ${spacing.sm};
`;

export const Avatar = styled.img`
    ${circularAvatar('32px')}
`;

export const AuthorInfo = styled.div``;

export const AuthorName = styled.span`
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.sm};
`;

export const Timestamp = styled.div`
    font-size: ${fontSizes.xs};
    color: ${colors.text.secondary};
`;
