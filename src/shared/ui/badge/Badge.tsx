import styled from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, borderRadius } from '@/shared/styles';

interface BadgeProps {
    $variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
    $size?: 'small' | 'medium';
}

const variantColors = {
    success: colors.issueOpen,
    error: colors.issueClosed,
    warning: colors.warning,
    info: colors.info,
    neutral: colors.text.secondary,
};

export const Badge = styled.span<BadgeProps>`
    display: inline-block;
    padding: ${({ $size = 'medium' }) => ($size === 'small' ? '2px' : '4px')} ${spacing.xs};
    border-radius: ${borderRadius.sm};
    font-size: ${({ $size = 'medium' }) => ($size === 'small' ? fontSizes.xxs : fontSizes.xs)};
    font-weight: ${fontWeights.bold};
    background-color: ${({ $variant = 'neutral' }) => variantColors[$variant]};
    color: #fff;
`;

export const IssueBadge = styled(Badge)<{ $state: 'OPEN' | 'CLOSED' }>`
    background-color: ${({ $state }) => ($state === 'OPEN' ? colors.issueOpen : colors.issueClosed)};
`;

export const LabelBadge = styled.span<{ $color: string }>`
    display: inline-block;
    padding: 2px ${spacing.xs};
    border-radius: ${borderRadius.full};
    font-weight: ${fontWeights.medium};
    font-size: 11px;
    background-color: ${({ $color }) => `#${$color}`};
    color: #fff;
`;
