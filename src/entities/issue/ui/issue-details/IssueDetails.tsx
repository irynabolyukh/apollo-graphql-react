import type { IssueDetail } from '@/entities/issue/model/types';
import { formatDate } from '@/shared/lib/utils';
import { CardLarge } from '@/shared/ui/card';
import Link from '@/shared/ui/link';
import { IssueBadge, LabelBadge } from '@/shared/ui/badge';
import HtmlContent from '@/shared/ui/html-content';
import {
    Header,
    TitleRow,
    Title,
    IssueNumber,
    Labels,
    AuthorSection,
    Avatar,
    AuthorInfo,
    AuthorName,
    Metadata,
    Separator,
    Body,
    Footer,
} from './IssueDetails.styles';

interface IssueDetailsProps {
    issue: IssueDetail;
}

export const IssueDetails = ({ issue }: IssueDetailsProps) => {
    return (
        <CardLarge>
            <Header>
                <TitleRow>
                    <IssueBadge
                        $state={issue.state}
                        $size="medium"
                    >
                        {issue.state}
                    </IssueBadge>
                    <Title>
                        {issue.title}
                        <IssueNumber>#{issue.number}</IssueNumber>
                    </Title>
                </TitleRow>

                {issue.labels.length > 0 && (
                    <Labels>
                        {issue.labels.map((label) => (
                            <LabelBadge
                                key={label.id}
                                $color={label.color}
                                title={label.description || undefined}
                            >
                                {label.name}
                            </LabelBadge>
                        ))}
                    </Labels>
                )}

                <AuthorSection>
                    {issue.author?.avatarUrl && (
                        <Avatar
                            src={issue.author.avatarUrl}
                            alt={issue.author.login}
                        />
                    )}
                    <AuthorInfo>
                        <AuthorName>
                            <Link
                                external
                                href={issue.author?.url || '#'}
                            >
                                {issue.author?.login || 'unknown'}
                            </Link>
                        </AuthorName>
                        <Metadata>
                            <span>opened {formatDate(issue.createdAt)}</span>
                            {issue.closedAt && (
                                <>
                                    <Separator>•</Separator>
                                    <span>closed {formatDate(issue.closedAt)}</span>
                                </>
                            )}
                            <Separator>•</Separator>
                            <span>💬 {issue.commentsCount} comments</span>
                        </Metadata>
                    </AuthorInfo>
                </AuthorSection>
            </Header>

            <Body>
                <HtmlContent html={issue.bodyHTML} />
            </Body>

            <Footer>
                <Link
                    external
                    href={issue.url}
                >
                    View on GitHub →
                </Link>
            </Footer>
        </CardLarge>
    );
};
