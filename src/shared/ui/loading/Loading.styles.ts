import styled, { keyframes, css } from 'styled-components';
import { colors, fontSizes, spacing, flexCenter, flexColumn, circularAvatar } from '@/shared/styles';

export type LoadingSize = 'small' | 'medium' | 'large';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const spinnerSizes = {
    small: { size: '24px', borderWidth: '3px' },
    medium: { size: '48px', borderWidth: '4px' },
    large: { size: '64px', borderWidth: '5px' },
};

const messageSizes = {
    small: fontSizes.xs,
    medium: fontSizes.sm,
    large: fontSizes.def,
};

const fullScreenStyle = css`
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.background.primary};
    z-index: 9999;
`;

export const Container = styled.div<{ $fullScreen?: boolean }>`
    ${flexCenter};
    padding: ${spacing.lg};
    ${({ $fullScreen }) => $fullScreen && fullScreenStyle}
`;

export const Content = styled.div`
    ${flexColumn(spacing.sm)};
    align-items: center;
`;

export const Spinner = styled.div<{ $size: LoadingSize }>`
    ${({ $size }) => {
        const { size, borderWidth } = spinnerSizes[$size];
        return css`
            ${circularAvatar(size)}
            border: ${borderWidth} solid ${colors.background.secondary};
            border-top: ${borderWidth} solid ${colors.primary};
        `;
    }}
    animation: ${spin} 1s linear infinite;
`;

export const Message = styled.p<{ $size: LoadingSize }>`
    color: ${colors.text.secondary};
    font-size: ${({ $size }) => messageSizes[$size]};
`;
