import styled from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, flexRow, flexColumn, circularAvatar } from '@/shared/styles';

export const Header = styled.div`
    margin-bottom: ${spacing.lg};
`;

export const TitleRow = styled.div`
    ${flexRow(spacing.sm)}
    margin-bottom: ${spacing.sm};
`;

export const Title = styled.h1`
    font-size: ${fontSizes.xl};
    font-weight: ${fontWeights.bold};
`;

export const IssueNumber = styled.span`
    color: ${colors.text.secondary};
    font-size: ${fontSizes.xl};
    margin-left: ${spacing.xs};
    font-weight: ${fontWeights.regular};
`;

export const Labels = styled.div`
    ${flexRow(spacing.xxs)}
    flex-wrap: wrap;
    margin-bottom: ${spacing.sm};
`;

export const AuthorSection = styled.div`
    ${flexRow(spacing.sm)}
    margin-bottom: ${spacing.md};
`;

export const Avatar = styled.img`
    ${circularAvatar('40px')}
`;

export const AuthorInfo = styled.div`
    ${flexColumn(spacing.xxs)}
`;

export const AuthorName = styled.span`
    font-weight: ${fontWeights.semibold};
    font-size: ${fontSizes.def};
`;

export const Metadata = styled.div`
    font-size: ${fontSizes.sm};
    color: ${colors.text.secondary};
`;

export const Separator = styled.span`
    margin: 0 ${spacing.xs};
`;

export const Body = styled.div`
    margin-bottom: ${spacing.xl};
`;

export const Footer = styled.div`
    margin-top: ${spacing.xl};
    padding-top: ${spacing.md};
    border-top: 1px solid ${colors.border.default};
    font-size: ${fontSizes.sm};
`;
