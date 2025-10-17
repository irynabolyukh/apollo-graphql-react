import { gql } from '@apollo/client';

/**
 * Core issue fields used across all issue queries
 */
export const ISSUE_CORE_FRAGMENT = gql`
    fragment IssueCore on Issue {
        id
        number
        title
        state
        createdAt
        updatedAt
        url
    }
`;

/**
 * Author information fragment
 */
export const AUTHOR_FRAGMENT = gql`
    fragment Author on Actor {
        login
        avatarUrl
        url
    }
`;

/**
 * Label information fragment
 */
export const LABEL_FRAGMENT = gql`
    fragment Label on Label {
        id
        name
        color
    }
`;

/**
 * Issue list item fragment - for issue lists/cards
 */
export const ISSUE_LIST_ITEM_FRAGMENT = gql`
    ${ISSUE_CORE_FRAGMENT}
    ${AUTHOR_FRAGMENT}
    ${LABEL_FRAGMENT}

    fragment IssueListItem on Issue {
        ...IssueCore
        closedAt
        bodyText
        author {
            ...Author
        }
        labels(first: 10) {
            edges {
                node {
                    ...Label
                }
            }
        }
        comments {
            totalCount
        }
    }
`;

/**
 * Issue detail fragment - for full issue view (without comments - fetch separately)
 */
export const ISSUE_DETAIL_FRAGMENT = gql`
    ${ISSUE_CORE_FRAGMENT}
    ${AUTHOR_FRAGMENT}

    fragment IssueDetail on Issue {
        ...IssueCore
        closedAt
        body
        bodyHTML
        author {
            ...Author
        }
        labels(first: 20) {
            edges {
                node {
                    id
                    name
                    color
                    description
                }
            }
        }
    }
`;

