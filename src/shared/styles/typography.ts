export const fontSizes = {
    xxs: '0.625rem', // 10px
    xs: '0.75rem', // 12px
    x: '0.8125rem', // 13px
    sm: '0.875rem', // 14px
    def: '1rem', // 16px
    md: '1.125rem', // 18px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    titleSm: '2rem', // 32px
    titleMd: '2.5rem', // 40px
    titleM: '2.75rem', // 44px
    titleMl: '3rem', // 48px
    titleLg: '3.375rem', // 54px
    titleXl: '4.0625rem', // 65px
    titleXxl: '4.375rem', // 86px
} as const;

export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
} as const;

export const fontFamilies = {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
} as const;
