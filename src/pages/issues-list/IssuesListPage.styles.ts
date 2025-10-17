import styled from 'styled-components';
import {
    colors,
    fontSizes,
    spacing,
    borderRadius,
    flexRow,
    flexColumn,
    transition,
    focusVisible,
} from '@/shared/styles';

export const Filters = styled.div`
    ${flexRow(spacing.sm)}
    margin-bottom: ${spacing.lg};
`;

export const Select = styled.select`
    padding: ${spacing.xs} ${spacing.sm};
    font-size: ${fontSizes.sm};
    border: 1px solid ${colors.border.default};
    border-radius: ${borderRadius.md};
    background-color: ${colors.background.secondary};
    color: ${colors.text.primary};
    cursor: pointer;
    ${transition('border-color')}
    ${focusVisible(colors.primary)};

    &:hover {
        border-color: ${colors.border.hover};
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: ${spacing.xs} ${spacing.sm};
    font-size: ${fontSizes.sm};
    border: 1px solid ${colors.border.default};
    border-radius: ${borderRadius.md};
    background-color: ${colors.background.secondary};
    color: ${colors.text.primary};
    ${transition('border-color')}

    &:hover {
        border-color: ${colors.border.hover};
    }

    ${focusVisible(colors.primary)};

    &::placeholder {
        color: ${colors.text.tertiary};
    }
`;

export const IssuesList = styled.div`
    ${flexColumn(spacing.md)}
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: ${spacing.xxl};
    color: ${colors.text.secondary};
`;

export const LoadMoreContainer = styled.div`
    margin-top: ${spacing.lg};
    text-align: center;
`;

export const Subtitle = styled.p`
    color: ${colors.text.secondary};
    font-size: ${fontSizes.sm};
`;
