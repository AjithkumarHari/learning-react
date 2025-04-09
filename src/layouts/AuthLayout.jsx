import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {

    return (
        <div>
            <div class="flex h-screen items-center justify-center overflow-hidden px-2">
                <Outlet />
            </div>
            <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};

export default Auth;