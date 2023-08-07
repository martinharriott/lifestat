import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createHashRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createHashRouter([
    {
      path: "/*",
      element: <App />,
    }
  ]);

root.render(
    <RouterProvider router={router} />
);