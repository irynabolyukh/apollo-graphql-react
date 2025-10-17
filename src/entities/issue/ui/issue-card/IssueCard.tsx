import { Link } from 'react-router-dom';
import type { IssueListItem } from '@/entities/issue/model/types';
import { PATHS } from '@/routes/constants';
import { formatDate } from '@/shared/lib/utils';

interface IssueCardProps {
    issue: IssueListItem;
}

export const IssueCard = ({ issue }: IssueCardProps) => {
    return (
        <div
            style={{
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                }}
            >
                <span
                    style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: issue.state === 'OPEN' ? '#28a745' : '#6f42c1',
                        color: '#fff',
                    }}
                >
                    {issue.state}
                </span>

                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>
                        <Link
                            to={PATHS.issueDetails(issue.number)}
                            style={{
                                color: '#0366d6',
                                textDecoration: 'none',
                            }}
                        >
                            {issue.title}
                        </Link>
                        <span
                            style={{
                                color: '#666',
                                fontSize: '14px',
                                marginLeft: '8px',
                            }}
                        >
                            #{issue.number}
                        </span>
                    </h3>

                    <p
                        style={{
                            margin: '0 0 8px 0',
                            color: '#666',
                            fontSize: '14px',
                        }}
                    >
                        {issue.bodyText.substring(0, 150)}
                        {issue.bodyText.length > 150 ? '...' : ''}
                    </p>

                    <div
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            display: 'flex',
                            gap: '12px',
                        }}
                    >
                        <span>by {issue.author?.login || 'unknown'}</span>
                        <span>{formatDate(issue.createdAt)}</span>
                        <span>💬 {issue.commentsCount} comments</span>
                    </div>

                    {issue.labels.length > 0 && (
                        <div
                            style={{
                                marginTop: '8px',
                                display: 'flex',
                                gap: '6px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {issue.labels.map((label) => (
                                <span
                                    key={label.id}
                                    style={{
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '11px',
                                        backgroundColor: `#${label.color}`,
                                        color: '#fff',
                                    }}
                                >
                                    {label.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
