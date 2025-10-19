export function validateIssueNumber(value: string | undefined): string | null {
    if (!value) return null;
    const num = Number(value);

    if (!Number.isInteger(num) || num <= 0 || num > Number.MAX_SAFE_INTEGER) {
        return null;
    }

    return num.toString();
}

export function sanitizeSearchQuery(value: string): string {
    if (!value) return '';

    return value
        .normalize('NFKC')
        .trim()
        .replace(/[\x00-\x1F\x7F]/g, '')
        .replace(/\s+/g, ' ')
        .slice(0, 500);
}
