import { useMemo } from 'react';
import { sanitizeHtml } from '@/shared/lib/utils';
import { HtmlWrapper } from './HtmlContent.styles';

interface HtmlContentProps {
    html: string;
}

export const HtmlContent = ({ html }: HtmlContentProps) => {
    const sanitizedHtml = useMemo(() => sanitizeHtml(html), [html]);

    return <HtmlWrapper dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default HtmlContent;
