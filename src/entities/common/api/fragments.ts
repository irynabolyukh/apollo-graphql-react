import { gql } from '@apollo/client';

export const AUTHOR_FRAGMENT = gql`
    fragment Author on Actor {
        login
        avatarUrl
        url
    }
`;

export const LABEL_FRAGMENT = gql`
    fragment Label on Label {
        id
        name
        color
    }
`;
