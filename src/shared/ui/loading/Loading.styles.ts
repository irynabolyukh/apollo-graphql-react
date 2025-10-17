import styled, { keyframes } from 'styled-components';
import { colors, flexCenter, spacing } from '@/shared/styles';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
    ${flexCenter};
    padding: ${spacing.lg};
    text-align: center;
`;

export const Spinner = styled.div<{ $size: number }>`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border: 4px solid ${colors.background.secondary};
    border-top: 4px solid ${colors.primary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: 0 auto 12px;
`;

export const Message = styled.p<{ $fontSize: number }>`
    color: ${colors.text.secondary};
    font-size: ${({ $fontSize }) => $fontSize}px;
`;
