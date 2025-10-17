import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate } from './utils';

vi.mock('@shared/api/config', () => ({
    API_CONFIG: {
        IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    },
    IMAGE_SIZES: {
        POSTER: 'w500',
        BACKDROP: 'original',
        THUMBNAIL: 'w200',
    },
}));

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
});
