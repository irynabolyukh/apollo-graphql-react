import CommentCard from '../comment-card';
import type { Comment } from '@/entities/comment/model';
import Button from '@/shared/ui/button';
import { useCommentsPagination } from '@/entities/comment/hooks';
import { Container, LoadMoreButton, ErrorContainer } from './CommentsList.styles';

interface CommentsListProps {
    issueNumber: string;
    initialComments: Comment[];
    hasMoreComments: boolean;
    totalCount: number;
}

/**
 * CommentsList component with pagination
 * Shows initial comments immediately, fetches more on demand
 */
export const CommentsList = ({ issueNumber, initialComments, hasMoreComments, totalCount }: CommentsListProps) => {
    const { comments, loading, loadMore, hasMore, error } = useCommentsPagination(
        issueNumber,
        initialComments,
        hasMoreComments,
    );

    return (
        <>
            <Container>
                {comments.map((comment: Comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                    />
                ))}
            </Container>

            {error && (
                <ErrorContainer>
                    <p>Failed to load more comments: {error.message || 'Please try again'}</p>
                    <Button
                        onClick={loadMore}
                        size="small"
                        variant="secondary"
                    >
                        Retry
                    </Button>
                </ErrorContainer>
            )}

            {!error && hasMore && (
                <LoadMoreButton>
                    <Button
                        onClick={loadMore}
                        loading={loading}
                        size="small"
                        variant="secondary"
                    >
                        Load More Comments ({comments.length} of {totalCount})
                    </Button>
                </LoadMoreButton>
            )}
        </>
    );
};

export default CommentsList;
