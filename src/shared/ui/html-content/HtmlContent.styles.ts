import styled from 'styled-components';
import { colors, fontSizes, fontWeights, fontFamilies, spacing, borderRadius } from '@/shared/styles';

export const HtmlWrapper = styled.div`
    font-family: ${fontFamilies.base};
    font-size: ${fontSizes.def};
    line-height: 1.6;
    color: ${colors.text.primary};
    word-break: break-word;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-bottom: ${spacing.md};
        font-weight: ${fontWeights.semibold};
        line-height: 1.25;
    }

    h1 {
        font-size: ${fontSizes.titleSm};
        padding-bottom: ${spacing.xs};
        border-bottom: 1px solid ${colors.border.default};
    }

    h2 {
        font-size: ${fontSizes.xl};
        padding-bottom: ${spacing.xs};
        border-bottom: 1px solid ${colors.border.default};
    }

    h3 {
        font-size: ${fontSizes.lg};
    }

    h4 {
        font-size: ${fontSizes.def};
    }

    h5 {
        font-size: ${fontSizes.sm};
    }

    h6 {
        font-size: ${fontSizes.sm};
        color: ${colors.text.secondary};
    }

    p {
        margin-bottom: ${spacing.md};
    }

    a {
        color: ${colors.text.link};

        &:hover {
            color: ${colors.text.linkHover};
            text-decoration: underline;
        }
    }

    code {
        padding: ${spacing.xxs} ${spacing.xs};
        font-size: ${fontSizes.sm};
        background-color: ${colors.background.secondary};
        border-radius: ${borderRadius.sm};
        font-family: ${fontFamilies.mono};
    }

    pre {
        padding: ${spacing.md};
        overflow: auto;
        font-size: ${fontSizes.sm};
        line-height: 1.45;
        background-color: ${colors.background.secondary};
        border-radius: ${borderRadius.md};
        margin-bottom: ${spacing.md};

        code {
            display: inline-block;
            padding: 0;
            overflow: visible;
            line-height: inherit;
            word-wrap: normal;
            background-color: transparent;
            border: 0;
        }
    }

    ul,
    ol {
        padding-left: ${spacing.xl};
        margin-bottom: ${spacing.md};
    }

    li {
        margin-bottom: ${spacing.xxs};
    }

    blockquote {
        padding: 0 ${spacing.md};
        color: ${colors.text.secondary};
        border-left: ${spacing.xxs} solid ${colors.border.default};
        margin-bottom: ${spacing.md};

        > :first-child {
            margin-top: 0;
        }

        > :last-child {
            margin-bottom: 0;
        }
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
        display: block;
        width: max-content;
        max-width: 100%;
        overflow: auto;
        margin-bottom: ${spacing.md};
    }

    thead {
        background-color: ${colors.background.secondary};
    }

    tr {
        border-top: 1px solid ${colors.border.default};
    }

    th,
    td {
        padding: ${spacing.xs} ${spacing.sm};
        border: 1px solid ${colors.border.default};
    }

    th {
        font-weight: ${fontWeights.semibold};
    }

    hr {
        height: ${spacing.xxs};
        padding: 0;
        margin: ${spacing.lg} 0;
        background-color: ${colors.border.default};
        border: 0;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: ${borderRadius.md};
        box-sizing: content-box;
    }

    input[type='checkbox'] {
        margin-right: ${spacing.xs};
    }

    del {
        text-decoration: line-through;
    }

    /* Task list items (GitHub style) */
    .task-list-item {
        list-style: none;

        input[type='checkbox'] {
            margin-right: ${spacing.xs};
        }
    }

    /* GitHub syntax highlighting classes */
    .highlight {
        background-color: ${colors.background.secondary};
    }

    /* Ensure nested lists are properly styled */
    li > ul,
    li > ol {
        margin-top: ${spacing.xxs};
    }
`;

