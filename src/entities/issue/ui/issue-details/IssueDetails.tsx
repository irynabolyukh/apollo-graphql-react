import type { IssueDetail } from '@/entities/issue/model/types';
import { formatDate } from '@/shared/lib/utils';

interface IssueDetailsProps {
    issue: IssueDetail;
}

export const IssueDetails = ({ issue }: IssueDetailsProps) => {
    return (
        <div
            style={{
                padding: '24px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}
        >
            <div style={{ marginBottom: '20px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <span
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            backgroundColor: issue.state === 'OPEN' ? '#28a745' : '#6f42c1',
                            color: '#fff',
                        }}
                    >
                        {issue.state}
                    </span>
                    <h1 style={{ margin: 0 }}>
                        {issue.title}
                        <span style={{ color: '#666', fontSize: '24px', marginLeft: '8px' }}>#{issue.number}</span>
                    </h1>
                </div>

                {issue.labels.length > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            gap: '6px',
                            flexWrap: 'wrap',
                            marginBottom: '12px',
                        }}
                    >
                        {issue.labels.map((label) => (
                            <span
                                key={label.id}
                                style={{
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    backgroundColor: `#${label.color}`,
                                    color: '#fff',
                                }}
                                title={label.description || undefined}
                            >
                                {label.name}
                            </span>
                        ))}
                    </div>
                )}

                <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                    <span>
                        Opened by{' '}
                        <a
                            href={issue.author?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#0366d6' }}
                        >
                            {issue.author?.login || 'unknown'}
                        </a>
                    </span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>{formatDate(issue.createdAt)}</span>
                    {issue.closedAt && (
                        <>
                            <span style={{ margin: '0 8px' }}>•</span>
                            <span>Closed {formatDate(issue.closedAt)}</span>
                        </>
                    )}
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>💬 {issue.commentsCount} comments</span>
                </div>
            </div>

            <div
                style={{
                    padding: '16px',
                    backgroundColor: '#f6f8fa',
                    borderRadius: '6px',
                    marginBottom: '24px',
                }}
            >
                <div
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: '1.6',
                    }}
                >
                    {issue.body || 'No description provided.'}
                </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #ddd' }}>
                <a
                    href={issue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#0366d6',
                        textDecoration: 'none',
                        fontSize: '14px',
                    }}
                >
                    View on GitHub →
                </a>
            </div>
        </div>
    );
};
