import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate } from './utils';
import { sanitizeHtml } from '@/shared/lib/utils/sanitize.ts';
describe('utils', () => {
    describe('formatDate', () => {
        beforeEach(() => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2024-01-15'));
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('formats date with custom options', () => {
            const result = formatDate('2023-12-25', { year: 'numeric', month: 'short' });
            expect(result).toBe('Dec 2023');
        });

        it('handles invalid date string', () => {
            const result = formatDate('invalid-date');
            expect(result).toBe('Invalid Date');
        });
    });

    describe('sanitizeHtml', () => {
        it('removes script tags', () => {
            const dirty = '<script>alert("XSS")</script><p>Safe</p>';
            const clean = sanitizeHtml(dirty);
            expect(clean).not.toContain('script');
            expect(clean).toContain('<p>Safe</p>');
        });

        it('adds target="_blank" to links', () => {
            const html = '<a href="https://example.com">Link</a>';
            const clean = sanitizeHtml(html);
            expect(clean).toContain('target="_blank"');
            expect(clean).toContain('rel="noopener noreferrer"');
        });
    });
});
