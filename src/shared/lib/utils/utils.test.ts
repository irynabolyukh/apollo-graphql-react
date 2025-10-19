import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sanitizeHtml } from './sanitize.ts';
import { formatDate } from './formatDate.ts';
import { buildGitHubSearchQuery } from '@/shared/lib/utils/buildGitHubSearchQuery.ts';
import { sanitizeSearchQuery, validateIssueNumber } from '@/shared/lib/utils/validation.ts';

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

    describe('buildGitHubSearchQuery', () => {
        it('builds query with all parameters', () => {
            const result = buildGitHubSearchQuery({
                owner: 'facebook',
                repo: 'react',
                type: 'issue',
                state: 'OPEN',
                searchTerm: 'memory leak',
                sort: 'created-desc',
            });

            expect(result).toBe('repo:facebook/react is:issue state:open sort:created-desc memory leak');
        });

        it('excludes state filter when ALL', () => {
            const result = buildGitHubSearchQuery({
                owner: 'facebook',
                repo: 'react',
                type: 'issue',
                state: 'ALL',
                searchTerm: 'hooks',
                sort: 'created-desc',
            });

            expect(result).toBe('repo:facebook/react is:issue sort:created-desc hooks');
            expect(result).not.toContain('state:');
        });

        it('supports pr type', () => {
            const result = buildGitHubSearchQuery({
                owner: 'facebook',
                repo: 'react',
                type: 'pr',
                state: 'OPEN',
                searchTerm: 'fix',
                sort: 'created-desc',
            });

            expect(result).toBe('repo:facebook/react is:pr state:open sort:created-desc fix');
        });
    });

    describe('validateIssueNumber', () => {
        it('should return valid issue number as string', () => {
            expect(validateIssueNumber('123')).toBe('123');
        });

        it('should return null for invalid inputs', () => {
            expect(validateIssueNumber('')).toBeNull();
            expect(validateIssueNumber(undefined)).toBeNull();
            expect(validateIssueNumber('0')).toBeNull();
            expect(validateIssueNumber('-5')).toBeNull();
            expect(validateIssueNumber('abc')).toBeNull();
            expect(validateIssueNumber('123abc')).toBeNull();
            expect(validateIssueNumber('#789')).toBeNull();
        });
    });

    describe('sanitizeSearchQuery', () => {
        it('should trim whitespace', () => {
            expect(sanitizeSearchQuery('  hello  ')).toBe('hello');
            expect(sanitizeSearchQuery('\n\ttab\n')).toBe('tab');
        });

        it('should normalize multiple spaces', () => {
            expect(sanitizeSearchQuery('hello    world')).toBe('hello world');
            expect(sanitizeSearchQuery('a  b  c')).toBe('a b c');
        });

        it('should remove control characters', () => {
            expect(sanitizeSearchQuery('hello\x00world')).toBe('helloworld');
            expect(sanitizeSearchQuery('test\x1Fstring')).toBe('teststring');
        });

        it('should limit length to 500 characters', () => {
            const longString = 'a'.repeat(600);
            expect(sanitizeSearchQuery(longString)).toHaveLength(500);
        });

        it('should preserve valid search terms', () => {
            expect(sanitizeSearchQuery('bug fix')).toBe('bug fix');
            expect(sanitizeSearchQuery('feature: add login')).toBe('feature: add login');
            expect(sanitizeSearchQuery('Fix #123')).toBe('Fix #123');
        });
    });
});
