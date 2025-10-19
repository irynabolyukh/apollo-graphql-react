import type { Comment } from '@/entities/comment/model/types';
import { formatDate } from '@/shared/lib/utils';
import { Card } from '@/shared/ui/card';
import Link from '@/shared/ui/link';
import HtmlContent from '@/shared/ui/html-content';
import { TopContent, Avatar, AuthorInfo, AuthorName, Timestamp } from './CommentCard.styles';
import { memo } from 'react';

interface CommentCardProps {
    comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
    return (
        <Card>
            <TopContent>
                {comment.author?.avatarUrl && (
                    <Avatar
                        src={comment.author.avatarUrl}
                        alt={comment.author.login}
                    />
                )}
                <AuthorInfo>
                    <AuthorName>
                        <Link
                            external
                            href={comment.author?.url || '#'}
                        >
                            {comment.author?.login || 'unknown'}
                        </Link>
                    </AuthorName>
                    <Timestamp>
                        {formatDate(comment.createdAt)}
                        {comment.createdAt !== comment.updatedAt && ' (edited)'}
                    </Timestamp>
                </AuthorInfo>
            </TopContent>

            <HtmlContent html={comment.bodyHTML} />
        </Card>
    );
};

const arePropsEqual = (prevProps: CommentCardProps, nextProps: CommentCardProps) => {
    return prevProps.comment.id === nextProps.comment.id && prevProps.comment.updatedAt === nextProps.comment.updatedAt;
};

export default memo(CommentCard, arePropsEqual);
