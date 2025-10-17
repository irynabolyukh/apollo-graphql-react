import styled, { css } from 'styled-components';
import { colors, fontSizes, fontWeights, spacing, borderRadius, transition, focusVisible } from '@/shared/styles';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface StyledButtonProps {
    $variant?: ButtonVariant;
    $size?: ButtonSize;
    $fullWidth?: boolean;
}

const sizeStyles = {
    small: css`
        padding: ${spacing.xs} ${spacing.md};
        font-size: ${fontSizes.sm};
    `,
    medium: css`
        padding: ${spacing.sm} ${spacing.lg};
        font-size: ${fontSizes.def};
    `,
    large: css`
        padding: ${spacing.md} ${spacing.xl};
        font-size: ${fontSizes.md};
    `,
};

const variantStyles = {
    primary: css`
        background-color: ${colors.primary};
        color: #fff;
        border: 1px solid ${colors.primary};

        &:hover:not(:disabled) {
            background-color: ${colors.primaryHover};
            border-color: ${colors.primaryHover};
        }

        &:active:not(:disabled) {
            background-color: ${colors.primaryActive};
            border-color: ${colors.primaryActive};
        }
    `,
    secondary: css`
        background-color: ${colors.background.secondary};
        color: ${colors.text.primary};
        border: 1px solid ${colors.border.default};

        &:hover:not(:disabled) {
            background-color: ${colors.background.hover};
            border-color: ${colors.border.hover};
        }
    `,
};

const fullWidthStyle = css`
    width: 100%;
`;

export const StyledButton = styled.button<StyledButtonProps>`
    ${transition()}
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${spacing.xs};
    font-family: inherit;
    font-weight: ${fontWeights.medium};
    line-height: 1.5;
    border-radius: ${borderRadius.md};
    cursor: pointer;
    white-space: nowrap;
    user-select: none;

    ${({ $size = 'medium' }) => sizeStyles[$size]}
    ${({ $variant = 'primary' }) => variantStyles[$variant]}
    ${({ $fullWidth }) => $fullWidth && fullWidthStyle}

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    ${focusVisible(colors.primary)};
`;
