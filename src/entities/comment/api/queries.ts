import { gql } from '@apollo/client';
import { COMMENT_FRAGMENT } from './fragments';
import { PAGE_INFO_FRAGMENT } from '@/graphql/fragments';

/**
 * Query to fetch comments for an issue with pagination
 * Used when user wants to see all comments
 */
export const GET_ISSUE_COMMENTS = gql`
    ${COMMENT_FRAGMENT}
    ${PAGE_INFO_FRAGMENT}

    query GetIssueComments(
        $owner: String!
        $repo: String!
        $number: Int!
        $first: Int!
        $after: String
        $orderBy: IssueCommentOrder
    ) {
        repository(owner: $owner, name: $repo) {
            id
            issue(number: $number) {
                id
                comments(first: $first, after: $after, orderBy: $orderBy) {
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
