import React from 'react';
import { Link } from "react-router-dom";
import { useStore } from '../store/authStore';

const NavBar = () => {

    const isLoggedIn = useStore((state) => state.isLoggedIn);

    const setLogout = useStore((state) => state.setLogout);

    return (
        <nav className="bg-[#1b263b] p-4 w-full">
            <div className="mx-2 flex justify-between items-center">
                <div className=" text-xl font-bold">React Workout</div>
                <ul className="flex space-x-4">
                    <li><Link to="/home" className="text-white hover:text-gray-300">Home</Link></li>
                    <li><Link to={isLoggedIn ? "/service" : "/login"} className="text-white hover:text-gray-300">Services</Link></li>
                    <li><Link to={isLoggedIn ? "/about" : "/login"} className="text-white hover:text-gray-300">About</Link></li>
                    <li><Link to="/" className="text-white hover:text-gray-300">Contact</Link></li>
                </ul>
                {isLoggedIn ? (
                    <Link to="/home">
                        <button onClick={setLogout}> Logout</button>
                    </Link>
                ) : (
                    <Link to="/auth/login">
                        <button> Login</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;