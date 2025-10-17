import { gql } from '@apollo/client';
import { ISSUE_LIST_ITEM_FRAGMENT, ISSUE_DETAIL_FRAGMENT, AUTHOR_FRAGMENT } from './fragments';

/**
 * Query to fetch a list of issues from a repository
 */
export const GET_REPOSITORY_ISSUES = gql`
    ${ISSUE_LIST_ITEM_FRAGMENT}

    query GetRepositoryIssues(
        $owner: String!
        $repo: String!
        $first: Int!
        $after: String
        $states: [IssueState!]
        $orderBy: IssueOrder
        $filterBy: IssueFilters
    ) {
        repository(owner: $owner, name: $repo) {
            id
            name
            owner {
                login
            }
            issues(
                first: $first
                after: $after
                states: $states
                orderBy: $orderBy
                filterBy: $filterBy
            ) {
                totalCount
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
                edges {
                    cursor
                    node {
                        ...IssueListItem
                    }
                }
            }
        }
    }
`;

/**
 * Query to fetch a single issue with full details and comments
 */
export const GET_ISSUE_DETAILS = gql`
    ${ISSUE_DETAIL_FRAGMENT}
    ${AUTHOR_FRAGMENT}

    query GetIssueDetails(
        $owner: String!
        $repo: String!
        $number: Int!
        $commentsOrderBy: IssueCommentOrder
    ) {
        repository(owner: $owner, name: $repo) {
            id
            name
            issue(number: $number) {
                ...IssueDetail
                comments(first: 50, orderBy: $commentsOrderBy) {
                    totalCount
                    edges {
                        node {
                            id
                            body
                            bodyHTML
                            createdAt
                            updatedAt
                            author {
                                ...Author
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Query to search for issues across repositories
 */
export const SEARCH_ISSUES = gql`
    ${ISSUE_LIST_ITEM_FRAGMENT}

    query SearchIssues($query: String!, $type: SearchType!, $first: Int!, $after: String) {
        search(query: $query, type: $type, first: $first, after: $after) {
            issueCount
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                cursor
                node {
                    ... on Issue {
                        ...IssueListItem
                        repository {
                            name
                            owner {
                                login
                            }
                        }
                    }
                }
            }
        }
    }
`;

