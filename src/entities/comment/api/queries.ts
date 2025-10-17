import { gql } from '@apollo/client';
import { COMMENT_FRAGMENT } from './fragments';

/**
 * Query to fetch comments for a specific issue with pagination
 * Comments are sorted by most recent first
 */
export const GET_ISSUE_COMMENTS = gql`
    ${COMMENT_FRAGMENT}

    query GetIssueComments(
        $owner: String!
        $repo: String!
        $number: Int!
        $first: Int!
        $after: String
        $orderBy: IssueCommentOrder
    ) {
        repository(owner: $owner, name: $repo) {
            issue(number: $number) {
                id
                comments(first: $first, after: $after, orderBy: $orderBy) {
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
                            ...Comment
                        }
                    }
                }
            }
        }
    }
`;

