import type { Comment } from '../../model/types';
import { formatDate } from '@/shared/lib/utils';

interface CommentCardProps {
    comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
    return (
        <div
            style={{
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                backgroundColor: '#fff',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                }}
            >
                {comment.author?.avatarUrl && (
                    <img
                        src={comment.author.avatarUrl}
                        alt={comment.author.login}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                        }}
                    />
                )}
                <div>
                    <a
                        href={comment.author?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontWeight: 'bold',
                            color: '#0366d6',
                            textDecoration: 'none',
                        }}
                    >
                        {comment.author?.login || 'unknown'}
                    </a>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {formatDate(comment.createdAt)}
                        {comment.createdAt !== comment.updatedAt && ' (edited)'}
                    </div>
                </div>
            </div>

            <div
                style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: '1.6',
                }}
            >
                {comment.body}
            </div>
        </div>
    );
};
