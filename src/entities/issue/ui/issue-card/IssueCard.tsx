import { memo } from 'react';
import type { IssueListItem } from '@/entities/issue/model/types';
import { PATHS } from '@/routes/constants';
import { formatDate } from '@/shared/lib/utils';
import { Card } from '@/shared/ui/card';
import Link from '@/shared/ui/link';
import { IssueBadge, LabelBadge } from '@/shared/ui/badge';
import {
    CardContent,
    CardBody,
    Title,
    IssueNumber,
    Description,
    Metadata,
    MetadataItem,
    Labels,
} from './IssueCard.styles';

interface IssueCardProps {
    issue: IssueListItem;
}

const IssueCard = ({ issue }: IssueCardProps) => {
    return (
        <Card>
            <CardContent>
                <IssueBadge $state={issue.state}>{issue.state}</IssueBadge>

                <CardBody>
                    <Title>
                        <Link to={PATHS.issueDetails(issue.number)}>{issue.title}</Link>
                        <IssueNumber>#{issue.number}</IssueNumber>
                    </Title>

                    <Description>
                        {issue.bodyText.substring(0, 150)}
                        {issue.bodyText.length > 150 ? '...' : ''}
                    </Description>

                    <Metadata>
                        <MetadataItem>by {issue.author?.login || 'unknown'}</MetadataItem>
                        <MetadataItem>{formatDate(issue.createdAt)}</MetadataItem>
                        <MetadataItem>💬 {issue.commentsCount} comments</MetadataItem>
                    </Metadata>

                    {issue.labels.length > 0 && (
                        <Labels>
                            {issue.labels.map((label) => (
                                <LabelBadge
                                    key={label.id}
                                    $color={label.color}
                                >
                                    {label.name}
                                </LabelBadge>
                            ))}
                        </Labels>
                    )}
                </CardBody>
            </CardContent>
        </Card>
    );
};

const arePropsEqual = (prevProps: IssueCardProps, nextProps: IssueCardProps) => {
    return prevProps.issue.id === nextProps.issue.id && prevProps.issue.updatedAt === nextProps.issue.updatedAt;
};

export default memo(IssueCard, arePropsEqual);
