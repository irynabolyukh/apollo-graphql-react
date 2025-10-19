import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { COMMENT_PAGINATION, DEFAULT_SORT, GITHUB_CONFIG } from '@/app/config/constants';
import { GET_ISSUE_DETAILS } from '@/entities/issue/api';
import type { GetIssueDetailsQuery, GetIssueDetailsQueryVariables } from '@/graphql/generated.ts';
import { type IssueDetail, mapToIssueDetail } from '@/entities/issue/model';
import { mapToComment, type Comment } from '@/entities/comment/model';
import { mapEdges, extractTotalCount, extractPageInfo } from '@/graphql/helpers';

/**
 * Hook for fetching repository issue details with initial comments
 */
export const useIssueWithComments = (number: string) => {
    const { data, loading, error } = useQuery<GetIssueDetailsQuery, GetIssueDetailsQueryVariables>(GET_ISSUE_DETAILS, {
        variables: {
            owner: GITHUB_CONFIG.owner,
            repo: GITHUB_CONFIG.repo,
            number: parseInt(number),
            commentsOrderBy: DEFAULT_SORT.COMMENTS,
            commentsAmount: COMMENT_PAGINATION.INITIAL,
        },
        skip: !number,
    });

    const issueData = data?.repository?.issue;

    const issue: IssueDetail | null = useMemo(() => {
        return issueData ? mapToIssueDetail(issueData) : null;
    }, [issueData]);

    const initialComments = useMemo<Comment[]>(() => {
        if (!issueData?.comments?.edges) return [];
        return mapEdges(issueData.comments.edges, mapToComment);
    }, [issueData?.comments?.edges]);

    const commentsPageInfo = extractPageInfo(issueData?.comments);
    const totalComments = extractTotalCount(issueData?.comments);

    return {
        loading,
        error,
        issue,
        initialComments,
        commentsPageInfo,
        totalComments,
    };
};
