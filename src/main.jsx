import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Login from './components/login.jsx';
import Home from './components/home.jsx';
import Service from './components/service.jsx';
import About from './components/about.jsx';
import Auth from './components/auth.jsx';
import Register from './components/register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Not Found</h1>,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Register />,
      },
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
