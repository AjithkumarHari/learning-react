import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/LoginForm.jsx";
import Home from "./pages/Home.jsx";
import Service from "./pages/Service.jsx";
import Auth from "./layouts/AuthLayout.jsx";
import Register from "./components/RegisterForm.jsx";
import Profile from "./pages/profile.jsx";
import MemberList from "./pages/MemberList.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import OtpForm from "./components/OtpForm.jsx";
import EmailForm from "./components/EmailForm.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
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
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/memberlist",
                element: <MemberList />,
            },
        ],
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
            {
                path: "otp",
                element: <OtpForm />,
            },
            {
                path: "forgot-password",
                element: <EmailForm />,
            },
            {
                path: "reset-password/",
                element: <ChangePassword />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <LoaderProvider>
        <RouterProvider router={router} />
    </LoaderProvider>
);
