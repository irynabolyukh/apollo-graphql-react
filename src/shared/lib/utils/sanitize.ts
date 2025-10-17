import DOMPurify from 'dompurify';

const PURIFY_CONFIG = {
    ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'strong',
        'em',
        'b',
        'i',
        'u',
        'del',
        'ins',
        'sub',
        'sup',
        'ul',
        'ol',
        'li',
        'a',
        'img',
        'code',
        'pre',
        'blockquote',
        'hr',
        'table',
        'thead',
        'tbody',
        'tfoot',
        'tr',
        'th',
        'td',
        'div',
        'span',
        'input',
    ],

    ALLOWED_ATTR: [
        'href',
        'src',
        'alt',
        'title',
        'class',
        'id',
        'target',
        'rel',
        'type',
        'checked',
        'disabled',
        'width',
        'height',
        'align',
        'valign',
        'data-footnote-ref',
        'data-footnote-backref',
    ],

    FORBID_TAGS: [
        'script',
        'iframe',
        'object',
        'embed',
        'applet',
        'style',
        'link',
        'base',
        'meta',
        'form',
        'button',
        'textarea',
        'select',
        'option',
    ],

    FORBID_ATTR: [
        'onerror',
        'onload',
        'onclick',
        'onmouseover',
        'onfocus',
        'onblur',
        'onchange',
        'onsubmit',
        'formaction',
        'action',
        'srcdoc',
    ],

    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SAFE_FOR_TEMPLATES: true,
    KEEP_CONTENT: true,
    RETURN_TRUSTED_TYPE: false,
    SANITIZE_DOM: true,
    FORCE_BODY: false,
    IN_PLACE: false,
};

/**
 * Sanitizes HTML content and makes all links external
 */
export const sanitizeHtml = (html: string): string => {
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
        if (node.tagName === 'A') {
            const anchor = node as HTMLAnchorElement;
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('rel', 'noopener noreferrer');
        }
    });

    const sanitized = DOMPurify.sanitize(html, PURIFY_CONFIG);

    DOMPurify.removeAllHooks();

    return sanitized;
};
