import { useParams } from 'react-router-dom';
import { IssueDetails } from '@/entities/issue/ui';
import { CommentsList } from '@/entities/comment/ui';
import Loading from '@/shared/ui/loading';
import Link from '@/shared/ui/link';
import ErrorMessage from '@/shared/ui/error-message';
import { PATHS } from '@/routes/constants';
import { CommentsTitle } from './IssueDetailPage.styles';
import { spacing } from '@/shared/styles';
import { useIssueWithComments } from '@/features/issue-with-comments/hooks';
import { validateIssueNumber } from '@/shared/lib/utils';

export const IssueDetailPage = () => {
    const { number } = useParams<{ number: string }>();
    const validatedNumber = validateIssueNumber(number);

    if (!validatedNumber) {
        return (
            <ErrorMessage
                title="Invalid Issue Number"
                message="Please provide a valid issue number"
            />
        );
    }

    const { issue, initialComments, commentsPageInfo, totalComments, loading, error } =
        useIssueWithComments(validatedNumber);

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

            {totalComments > 0 && (
                <>
                    <CommentsTitle>Comments ({totalComments})</CommentsTitle>
                    <CommentsList
                        issueNumber={validatedNumber}
                        initialComments={initialComments}
                        hasMoreComments={commentsPageInfo?.hasNextPage ?? false}
                        totalCount={totalComments}
                    />
                </>
            )}
        </>
    );
};
