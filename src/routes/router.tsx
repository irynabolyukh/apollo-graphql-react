import { createBrowserRouter } from 'react-router-dom';
import { IssuesListPage } from '@/pages/issues-list';
import { IssueDetailPage } from '@/pages/issue-detail';
import { NotFoundPage } from '@/pages/not-found';
import { ROUTES } from '@/routes/constants';

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <IssuesListPage />,
    },
    {
        path: ROUTES.ISSUE_DETAILS,
        element: <IssueDetailPage />,
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
    },
]);
