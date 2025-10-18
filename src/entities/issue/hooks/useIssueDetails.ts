import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { COMMENTS_AMOUNT, DEFAULT_SORT, GITHUB_CONFIG } from '@/app/config';
import { GET_ISSUE_DETAILS } from '@/entities/issue/api';
import type { GetIssueDetailsQuery, GetIssueDetailsQueryVariables } from '@/graphql/generated.ts';
import { type IssueDetail, mapToIssueDetail } from '@/entities/issue/model';
import { mapToComment, type Comment } from '@/entities/comment/model';
import { mapEdges } from '@/shared/lib/apollo/apollo-helpers';

/**
 * Hook for fetching repository issue details with comments
 */
export const useIssueDetails = (number: string) => {
    const { data, loading, error } = useQuery<GetIssueDetailsQuery, GetIssueDetailsQueryVariables>(GET_ISSUE_DETAILS, {
        variables: {
            owner: GITHUB_CONFIG.owner,
            repo: GITHUB_CONFIG.repo,
            number: parseInt(number || '0', 10),
            commentsOrderBy: DEFAULT_SORT.COMMENTS,
            commentsAmount: COMMENTS_AMOUNT,
        },
        skip: !number,
    });

    const issueData = data?.repository?.issue;

    const issue: IssueDetail | null = useMemo(() => {
        return issueData ? mapToIssueDetail(issueData) : null;
    }, [issueData]);

    const comments = useMemo<Comment[]>(() => {
        if (!issueData?.comments?.edges) return [];
        return mapEdges(issueData.comments.edges, mapToComment);
    }, [issueData?.comments?.edges]);

    return {
        data,
        loading,
        error,
        comments,
        issue,
    };
};
