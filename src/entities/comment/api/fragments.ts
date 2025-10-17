import { gql } from '@apollo/client';
import { AUTHOR_FRAGMENT } from '@/entities/issue/api/fragments';

/**
 * Comment fragment with all fields
 */
export const COMMENT_FRAGMENT = gql`
    ${AUTHOR_FRAGMENT}

    fragment Comment on IssueComment {
        id
        body
        bodyHTML
        createdAt
        updatedAt
        author {
            ...Author
        }
    }
`;

