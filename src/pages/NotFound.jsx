import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div class="text-white min-h-screen flex items-center">
            <div class="w-full md:w-7/12 text-center md:text-left p-15">
                <div class="text-6xl font-medium">404</div>
                <div class="text-xl md:text-3xl font-medium my-4">
                    Oops. This page has gone missing.
                </div>
                <div class="text-lg mb-8">
                    You may have mistyped the address or the page may have moved.
                </div>
                <Link to={'/home'} class="border font-medium border-white rounded-lg py-3 px-4 text-white hover:bg-white hover:text-[#0d1b2a]">Go Home</Link>
            </div>
        </div>
    );
};

export default NotFound;