import { colors } from './colors';
import { fontSizes, fontWeights, fontFamilies } from './typography';
import { breakpointValues, media, mediaMax } from './breakpoints';
import { spacing, containerWidths, borderRadius, shadows } from './spacing';

export const theme = {
    colors,
    fontSizes,
    fontWeights,
    fontFamilies,
    breakpointValues,
    media,
    mediaMax,
    spacing,
    containerWidths,
    borderRadius,
    shadows,
} as const;

export type Theme = typeof theme;
