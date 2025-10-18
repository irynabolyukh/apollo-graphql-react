import { useParams } from 'react-router-dom';
import { IssueDetails } from '@/entities/issue/ui';
import { CommentCard } from '@/entities/comment/ui';
import Loading from '@/shared/ui/loading';
import Link from '@/shared/ui/link';
import ErrorMessage from '@/shared/ui/error-message';
import { PATHS } from '@/routes/constants';
import { CommentsTitle, CommentsList } from './IssueDetailPage.styles';
import { spacing } from '@/shared/styles';
import { useIssueDetails } from '@/entities/issue/hooks/useIssueDetails.ts';

export const IssueDetailPage = () => {
    const { number } = useParams<{ number: string }>();

    if (!number) {
        return (
            <ErrorMessage
                title="Invalid Issue"
                message="Issue number is required"
            />
        );
    }

    const { issue, comments, loading, error } = useIssueDetails(number);

    if (loading) {
        return <Loading message="Loading issue details..." />;
    }

    if (error) {
        return (
            <ErrorMessage
                title="Error Loading Issue"
                error={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    if (!issue) {
        return (
            <ErrorMessage
                title="Issue Not Found"
                message="The requested issue does not exist"
            />
        );
    }

    return (
        <>
            <Link
                style={{ marginBottom: spacing.lg }}
                to={PATHS.home}
            >
                ← Back to Issues
            </Link>

            <IssueDetails issue={issue} />

            {comments.length > 0 && (
                <>
                    <CommentsTitle>Comments ({comments.length})</CommentsTitle>
                    <CommentsList>
                        {comments.map((comment) => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </CommentsList>
                </>
            )}
        </>
    );
};
