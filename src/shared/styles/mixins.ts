import { css } from 'styled-components';

export const flexColumn = (gap?: string) => css`
    display: flex;
    flex-direction: column;
    ${gap && `gap: ${gap};`}
`;

export const flexRow = (gap?: string, align = 'center') => css`
    display: flex;
    align-items: ${align};
    ${gap && `gap: ${gap};`}
`;

export const transition = (property = 'all', duration = '0.2s', easing = 'ease-in-out') => css`
    transition: ${property} ${duration} ${easing};
`;

export const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const focusVisible = (color = 'currentColor') => css`
    &:focus-visible {
        outline: 2px solid ${color};
        outline-offset: 2px;
    }
`;

export const circularAvatar = (size = '40px') => css`
    width: ${size};
    height: ${size};
    border-radius: 50%;
`;
