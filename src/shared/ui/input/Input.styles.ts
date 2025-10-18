import styled, { css } from 'styled-components';
import { colors, fontSizes, spacing, borderRadius, transition, focusVisible } from '@/shared/styles';

const fullWidthStyle = css`
    width: 100%;
`;

export const StyledInput = styled.input<{ $fullWidth?: boolean }>`
    padding: ${spacing.xs} ${spacing.sm};
    font-size: ${fontSizes.sm};
    border: 1px solid ${colors.border.default};
    border-radius: ${borderRadius.md};
    background-color: ${colors.background.secondary};
    color: ${colors.text.primary};
    ${transition('border-color')}
    ${({ $fullWidth }) => $fullWidth && fullWidthStyle}

    &:hover {
        border-color: ${colors.border.hover};
    }

    ${focusVisible(colors.primary)}

    &::placeholder {
        color: ${colors.text.tertiary};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: ${colors.background.secondary};
    }
`;

