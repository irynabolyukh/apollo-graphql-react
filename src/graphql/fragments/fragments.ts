import { gql } from '@apollo/client';

export const PAGE_INFO_FRAGMENT = gql`
    fragment PageInfo on PageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
    }
`;
