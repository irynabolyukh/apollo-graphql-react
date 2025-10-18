import { useState, useCallback, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { PAGINATION, DEFAULT_SORT, GITHUB_CONFIG } from '@/app/config';
import { GET_ISSUE_COMMENTS } from '@/entities/comment/api';
import type { GetIssueCommentsQuery, GetIssueCommentsQueryVariables } from '@/graphql/generated';
import { mapToComment, type Comment } from '@/entities/comment/model';
import { mapEdges } from '@/shared/lib/apollo/apollo-helpers';

/**
 * Hook for managing comments pagination
 * Resets state when issue changes to prevent stale data
 *
 * @param issueNumber - Issue number
 * @param initialComments - Comments from issue details query
 * @param hasMore - Whether more comments exist
 */
export const useCommentsPagination = (issueNumber: string, initialComments: Comment[], hasMore: boolean) => {
    const [showMoreClicked, setShowMoreClicked] = useState(false);

    useEffect(() => {
        setShowMoreClicked(false);
    }, [issueNumber]);

    const { data, loading, fetchMore, error } = useQuery<GetIssueCommentsQuery, GetIssueCommentsQueryVariables>(
        GET_ISSUE_COMMENTS,
        {
            variables: {
                owner: GITHUB_CONFIG.owner,
                repo: GITHUB_CONFIG.repo,
                number: parseInt(issueNumber),
                first: PAGINATION.COMMENTS_PAGE_SIZE,
                orderBy: DEFAULT_SORT.COMMENTS,
            },
            skip: !showMoreClicked,
        },
    );

    const comments = useMemo(() => {
        if (!showMoreClicked) return initialComments;

        const fetchedComments = mapEdges(data?.repository?.issue?.comments?.edges, mapToComment);
        return fetchedComments.length > 0 ? fetchedComments : initialComments;
    }, [showMoreClicked, initialComments, data]);

    const pageInfo = data?.repository?.issue?.comments?.pageInfo ?? null;

    const loadMore = useCallback(() => {
        if (!showMoreClicked) {
            setShowMoreClicked(true);
        } else if (pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    after: pageInfo.endCursor,
                },
            });
        }
    }, [showMoreClicked, pageInfo, fetchMore]);

    const shouldShowButton = !showMoreClicked ? hasMore : (pageInfo?.hasNextPage ?? false);

    return {
        comments,
        loading,
        loadMore,
        hasMore: shouldShowButton,
        error,
    };
};
