export const breakpointValues = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 485,
    tabletS: 600,
    tablet: 768,
    tabletL: 992,
    laptop: 1024,
    laptopS: 1199,
    laptopM: 1280,
    laptopL: 1440,
    laptopXL: 1920,
    desktop: 2560,
} as const;

export const media = {
    mobileS: `@media (min-width: ${breakpointValues.mobileS}px)`,
    mobileM: `@media (min-width: ${breakpointValues.mobileM}px)`,
    mobileL: `@media (min-width: ${breakpointValues.mobileL}px)`,
    tabletS: `@media (min-width: ${breakpointValues.tabletS}px)`,
    tablet: `@media (min-width: ${breakpointValues.tablet}px)`,
    tabletL: `@media (min-width: ${breakpointValues.tabletL}px)`,
    laptop: `@media (min-width: ${breakpointValues.laptop}px)`,
    laptopS: `@media (min-width: ${breakpointValues.laptopS}px)`,
    laptopM: `@media (min-width: ${breakpointValues.laptopM}px)`,
    laptopL: `@media (min-width: ${breakpointValues.laptopL}px)`,
    laptopXL: `@media (min-width: ${breakpointValues.laptopXL}px)`,
    desktop: `@media (min-width: ${breakpointValues.desktop}px)`,
} as const;

export const mediaMax = {
    mobileS: `@media (max-width: ${breakpointValues.mobileS - 1}px)`,
    mobileM: `@media (max-width: ${breakpointValues.mobileM - 1}px)`,
    mobileL: `@media (max-width: ${breakpointValues.mobileL - 1}px)`,
    tabletS: `@media (max-width: ${breakpointValues.tabletS - 1}px)`,
    tablet: `@media (max-width: ${breakpointValues.tablet - 1}px)`,
    tabletL: `@media (max-width: ${breakpointValues.tabletL - 1}px)`,
    laptop: `@media (max-width: ${breakpointValues.laptop - 1}px)`,
    laptopS: `@media (max-width: ${breakpointValues.laptopS - 1}px)`,
    laptopM: `@media (max-width: ${breakpointValues.laptopM - 1}px)`,
    laptopL: `@media (max-width: ${breakpointValues.laptopL - 1}px)`,
    laptopXL: `@media (max-width: ${breakpointValues.laptopXL - 1}px)`,
    desktop: `@media (max-width: ${breakpointValues.desktop - 1}px)`,
} as const;
