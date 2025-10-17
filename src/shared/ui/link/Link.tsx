import { type LinkProps as RouterLinkProps } from 'react-router-dom';
import { StyledLink, StyledExternalLink, type LinkVariant } from './Link.styles';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface BaseLinkProps {
    variant?: LinkVariant;
    children: ReactNode;
}
interface InternalLinkProps extends BaseLinkProps, Omit<RouterLinkProps, 'children'> {
    external?: false;
}
interface ExternalLinkProps extends BaseLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
    external: true;
    href: string;
}

type LinkComponentProps = InternalLinkProps | ExternalLinkProps;

const Link = ({ variant = 'primary', children, external, ...props }: LinkComponentProps) => {
    if (external) {
        const { href, ...anchorProps } = props as ExternalLinkProps;
        return (
            <StyledExternalLink
                href={href}
                $variant={variant}
                target="_blank"
                rel="noopener noreferrer"
                {...anchorProps}
            >
                {children}
            </StyledExternalLink>
        );
    }

    const { to, ...linkProps } = props as InternalLinkProps;
    return (
        <StyledLink
            to={to}
            $variant={variant}
            {...linkProps}
        >
            {children}
        </StyledLink>
    );
};

Link.displayName = 'Link';

export default Link;
