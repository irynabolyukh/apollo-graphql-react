export const ROUTES = {
    HOME: '/',
    ISSUE_DETAILS: '/issues/:number',
    NOT_FOUND: '*',
};

export const PATHS = {
    home: '/',
    issueDetails: (id: number) => `/issues/${id}`,
};
