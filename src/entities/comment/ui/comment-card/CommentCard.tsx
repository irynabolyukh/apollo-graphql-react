import type { Comment } from '@/entities/comment/model/types';
import { formatDate } from '@/shared/lib/utils';
import { Card } from '@/shared/ui/card';
import Link from '@/shared/ui/link';
import HtmlContent from '@/shared/ui/html-content';
import { Header, Avatar, AuthorInfo, AuthorName, Timestamp } from './CommentCard.styles';

interface CommentCardProps {
    comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
    return (
        <Card>
            <Header>
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
            </Header>

            <HtmlContent html={comment.bodyHTML} />
        </Card>
    );
};
