import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import AddView from './views/AddView';
import HistoryView from './views/HistoryView';
import HomeView from './views/HomeView';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

const router = createHashRouter([
    {
        path: '/',
        // element: <PageIndex />,
        children: [
            {
                index: true,
                element: <HomeView />,
            },
            {
                path: '/add',
                element: <AddView />,
            },
            {
                path: '/history',
                element: <HistoryView />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </StrictMode>,
);
