import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/shared/layouts/root-layout';
import { ErrorPage } from '@/pages/error';
import { ROUTES } from '@/routes/constants';

const IssuesListPage = lazy(() => import('@/pages/issues-list').then((m) => ({ default: m.IssuesListPage })));
const IssueDetailPage = lazy(() => import('@/pages/issue-detail').then((m) => ({ default: m.IssueDetailPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })));

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: ROUTES.HOME,
                element: <IssuesListPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.ISSUE_DETAILS,
                element: <IssueDetailPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <NotFoundPage />,
            },
        ],
    },
]);
