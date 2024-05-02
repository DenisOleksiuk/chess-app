import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.tsx';

import './index.css';
import Game from './routes/game.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
    },
    {
        path: '/game',
        element: <Game />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
