import { gql } from '@apollo/client';
import { ISSUE_LIST_ITEM_FRAGMENT, ISSUE_DETAIL_FRAGMENT, ISSUE_CORE_FRAGMENT } from './fragments';
import { AUTHOR_FRAGMENT, LABEL_FRAGMENT } from '@/entities/common/api/fragments';
import { COMMENT_FRAGMENT } from '@/entities/comment/api/fragments';
import { PAGE_INFO_FRAGMENT } from '@/graphql/fragments';

/**
 * Query to fetch a list of issues from a repository
 */
export const GET_REPOSITORY_ISSUES = gql`
    ${ISSUE_LIST_ITEM_FRAGMENT}
    ${PAGE_INFO_FRAGMENT}

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
            issues(first: $first, after: $after, states: $states, orderBy: $orderBy, filterBy: $filterBy) {
                totalCount
                pageInfo {
                    ...PageInfo
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
 * Query to fetch a single issue with full details and first comments
 */
export const GET_ISSUE_DETAILS = gql`
    ${ISSUE_DETAIL_FRAGMENT}
    ${COMMENT_FRAGMENT}
    ${PAGE_INFO_FRAGMENT}

    query GetIssueDetails(
        $owner: String!
        $repo: String!
        $number: Int!
        $commentsOrderBy: IssueCommentOrder
        $commentsAmount: Int!
    ) {
        repository(owner: $owner, name: $repo) {
            id
            issue(number: $number) {
                ...IssueDetail
                comments(first: $commentsAmount, orderBy: $commentsOrderBy) {
                    totalCount
                    pageInfo {
                        ...PageInfo
                    }
                    edges {
                        node {
                            ...Comment
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Query to search for issues within a specific repository
 * using GitHub Search API
 */
export const SEARCH_ISSUES = gql`
    ${ISSUE_CORE_FRAGMENT}
    ${AUTHOR_FRAGMENT}
    ${LABEL_FRAGMENT}
    ${PAGE_INFO_FRAGMENT}

    query SearchIssues($query: String!, $type: SearchType!, $first: Int!, $after: String) {
        search(query: $query, type: $type, first: $first, after: $after) {
            issueCount
            pageInfo {
                ...PageInfo
            }
            edges {
                cursor
                node {
                    ... on Issue {
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
                }
            }
        }
    }
`;
