import { gql } from '@apollo/client';
import { AUTHOR_FRAGMENT, LABEL_FRAGMENT } from '@/entities/common/api/fragments.ts';

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
 * Issue detail fragment - for full issue view
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
                }
            }
        }
    }
`;
