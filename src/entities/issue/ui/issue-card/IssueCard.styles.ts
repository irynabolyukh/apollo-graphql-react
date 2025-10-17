import styled from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, flexRow } from '@/shared/styles';

export const CardContent = styled.div`
    ${flexRow(spacing.sm, 'flex-start')}
`;

export const CardBody = styled.div`
    flex: 1;
`;

export const Title = styled.h3`
    margin-bottom: ${spacing.xs};
    font-size: ${fontSizes.def};
    font-weight: ${fontWeights.semibold};
`;

export const IssueNumber = styled.span`
    color: ${colors.text.secondary};
    font-size: ${fontSizes.sm};
    margin-left: ${spacing.xs};
    font-weight: ${fontWeights.regular};
`;

export const Description = styled.p`
    margin-bottom: ${spacing.xs};
    color: ${colors.text.secondary};
    font-size: ${fontSizes.sm};
    line-height: 1.5;
`;

export const Metadata = styled.div`
    ${flexRow(spacing.sm)}
    font-size: ${fontSizes.xs};
    color: ${colors.text.secondary};
`;

export const MetadataItem = styled.span``;

export const Labels = styled.div`
    ${flexRow(spacing.xxs)}
    margin-top: ${spacing.xs};
    flex-wrap: wrap;
`;

