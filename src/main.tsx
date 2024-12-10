import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import DocumentationView from './components/deprecatedViews/DocumentationView';
import AddView from './views/AddView';
import HomeView from './views/HomeView';

// const PageIndex = () => {
//     return (
//         <div>
//             <h1>Assignment</h1>
//             <ul>
//                 <li>
//                     <Link to="/">Timers</Link>
//                 </li>
//                 <li>
//                     <Link to="/docs">Documentation</Link>
//                 </li>
//             </ul>
//             <Outlet />
//         </div>
//     );
// };

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
                path: '/docs',
                element: <DocumentationView />,
            },
            {
                path: '/add',
                element: <AddView />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
