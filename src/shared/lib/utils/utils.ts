const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
    return new Date(dateString).toLocaleDateString('en-US', options || DATE_OPTIONS);
};
