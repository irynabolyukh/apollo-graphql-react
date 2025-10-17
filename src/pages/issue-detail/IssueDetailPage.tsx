import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GITHUB_CONFIG, DEFAULT_SORT } from '@/app/config/constants';
import { GET_ISSUE_DETAILS } from '@/entities/issue/api';
import { mapToIssueDetail, type IssueDetail } from '@/entities/issue/model';
import { IssueDetails } from '@/entities/issue/ui';
import { mapToComment, type Comment } from '@/entities/comment/model';
import { CommentCard } from '@/entities/comment/ui';
import type { GetIssueDetailsQuery, GetIssueDetailsQueryVariables } from '@/graphql/generated';
import Loading from '@/shared/ui/loading';
import Link from '@/shared/ui/link';
import { PATHS } from '@/routes/constants';
import { colors, spacing } from '@/shared/styles';
import { BackButtonContainer, CommentsSection, CommentsTitle, CommentsList } from './IssueDetailPage.styles';

export const IssueDetailPage = () => {
    const { number } = useParams<{ number: string }>();

    const { data, loading, error } = useQuery<GetIssueDetailsQuery, GetIssueDetailsQueryVariables>(GET_ISSUE_DETAILS, {
        variables: {
            owner: GITHUB_CONFIG.owner,
            repo: GITHUB_CONFIG.repo,
            number: parseInt(number || '0', 10),
            commentsOrderBy: DEFAULT_SORT.COMMENTS,
        },
        skip: !number,
    });

    if (!number) {
        return <p>Invalid issue number</p>;
    }

    if (loading) {
        return <Loading message="Loading issue details..." />;
    }

    if (error) {
        return (
            <>
                <p style={{ color: colors.error, marginBottom: spacing.md }}>{error.message}</p>
                <Link to={PATHS.home}>Back to Issues</Link>
            </>
        );
    }

    const issueData = data?.repository?.issue;

    if (!issueData) {
        return (
            <>
                <p style={{ marginBottom: spacing.md }}>Issue not found</p>
                <Link to={PATHS.home}>Back to Issues</Link>
            </>
        );
    }

    const issue: IssueDetail = mapToIssueDetail(issueData);
    console.log(issueData);
    const comments: Comment[] =
        issueData.comments?.edges?.map((edge: any) => edge.node && mapToComment(edge.node)).filter(Boolean) || [];

    return (
        <>
            <BackButtonContainer>
                <Link to={PATHS.home}>← Back to Issues</Link>
            </BackButtonContainer>

            <IssueDetails issue={issue} />

            {comments.length > 0 && (
                <CommentsSection>
                    <CommentsTitle>Comments ({comments.length})</CommentsTitle>
                    <CommentsList>
                        {comments.map((comment) => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </CommentsList>
                </CommentsSection>
            )}
        </>
    );
};
