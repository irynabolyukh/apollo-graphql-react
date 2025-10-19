import { useCallback, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import { DEFAULT_SORT, GITHUB_CONFIG, COMMENT_PAGINATION } from '@/app/config';
import { GET_ISSUE_COMMENTS } from '@/entities/comment/api';
import type { GetIssueCommentsQuery, GetIssueCommentsQueryVariables } from '@/graphql/generated';
import { mapToComment, type Comment } from '@/entities/comment/model';
import { mapEdges } from '@/shared/lib/apollo/apollo-helpers';

/**
 * Hook for managing on-demand comments pagination
 * Uses lazy query to fetch comments only when user requests them
 *
 * @param issueNumber - Issue number
 * @param initialComments - Comments from issue details query (shown initially)
 * @param hasMore - Whether more comments exist (from initial query)
 */
export const useCommentsPagination = (issueNumber: string, initialComments: Comment[], hasMore: boolean) => {
    const [executeQuery, { data, loading, fetchMore, error }] = useLazyQuery<
        GetIssueCommentsQuery,
        GetIssueCommentsQueryVariables
    >(GET_ISSUE_COMMENTS);

    const comments = useMemo(() => {
        if (!data) return initialComments;

        const fetchedComments = mapEdges(data?.repository?.issue?.comments?.edges, mapToComment);
        return fetchedComments.length > 0 ? fetchedComments : initialComments;
    }, [data, initialComments]);

    const pageInfo = data?.repository?.issue?.comments?.pageInfo ?? null;

    const loadMore = useCallback(() => {
        if (!data) {
            executeQuery({
                variables: {
                    owner: GITHUB_CONFIG.owner,
                    repo: GITHUB_CONFIG.repo,
                    number: parseInt(issueNumber),
                    first: COMMENT_PAGINATION.PAGE_SIZE,
                    orderBy: DEFAULT_SORT.COMMENTS,
                },
            });
        } else if (pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    after: pageInfo.endCursor,
                },
            });
        }
    }, [data, pageInfo, executeQuery, fetchMore, issueNumber]);

    const shouldShowButton = !data ? hasMore : (pageInfo?.hasNextPage ?? false);

    return {
        comments,
        loading,
        loadMore,
        hasMore: shouldShowButton,
        error,
    };
};
