import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GITHUB_CONFIG, DEFAULT_SORT } from '@/app/config/constants';
import { GET_ISSUE_DETAILS } from '@/entities/issue/api';
import { mapToIssueDetail, type IssueDetail } from '@/entities/issue/model';
import { IssueDetails } from '@/entities/issue/ui';
import { mapToComment, type Comment } from '@/entities/comment/model';
import { CommentCard } from '@/entities/comment/ui';
import type { GetIssueDetailsQuery, GetIssueDetailsQueryVariables } from '@/graphql/generated';
import { Loading } from '@/shared/ui/loading';
import { PATHS } from '@/routes/constants';

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
        return (
            <div style={{ padding: '20px' }}>
                <p>Invalid issue number</p>
            </div>
        );
    }

    if (loading) {
        return <Loading message="Loading issues..." />;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error loading issue</h2>
                <p>{error.message}</p>
                <Link
                    to={PATHS.home}
                    style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                    }}
                >
                    Back to Issues
                </Link>
            </div>
        );
    }

    const issueData = data?.repository?.issue;

    if (!issueData) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Issue not found</h2>
                <Link
                    to={PATHS.home}
                    style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                    }}
                >
                    Back to Issues
                </Link>
            </div>
        );
    }

    const issue: IssueDetail = mapToIssueDetail(issueData);
    const comments: Comment[] =
        issueData.comments?.edges?.map((edge: any) => edge.node && mapToComment(edge.node)).filter(Boolean) || [];

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Link
                to={PATHS.home}
                style={{
                    marginBottom: '20px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: '#f6f8fa',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                }}
            >
                ← Back to Issues
            </Link>

            <IssueDetails issue={issue} />

            {comments.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                    <h2 style={{ marginBottom: '16px' }}>Comments ({comments.length})</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {comments.map((comment) => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
