import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useStore } from '../store/authStore';
import PrimaryButton from './form_elements/PrimaryButton';
import logoutIcon from '../assets/logout-icon.png';
import loginIcon from '../assets/login-icon.png';

const NavBar = () => {

    const isLoggedIn = useStore((state) => state.isLoggedIn);

    const setLogout = useStore((state) => state.setLogout);

    return (
        <nav className="bg-[#1b263b] p-4 w-full">
            <div className="mx-2 flex justify-between items-center">
                <div className=" text-xl font-bold">React Workout</div>
                <ul className="flex space-x-4">
                    <li>
                        <NavLink to="/home" className={({ isActive }) =>
                            isActive ? 'text-[#a663cc] font-bold antialiased' : 'text-white hover:text-gray-300'
                        }>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={isLoggedIn ? "/service" : "/auth/login"} className={({ isActive }) =>
                            isActive ? 'text-[#a663cc] font-bold' : 'text-white hover:text-gray-300'
                        }>Services</NavLink>
                    </li>
                    <li>
                        <NavLink to={isLoggedIn ? "/profile" : "/auth/login"} className={({ isActive }) =>
                            isActive ? 'text-[#a663cc] font-bold' : 'text-white hover:text-gray-300'
                        }>Profile</NavLink>
                    </li>
                </ul>
                {isLoggedIn ? (
                    <Link to="/home">
                        <PrimaryButton label="Logout" width='105px' onClick={setLogout} sufixImage={logoutIcon}/>
                    </Link>
                ) : (
                    <Link to="/auth/login">
                        <PrimaryButton label="Login" width='105px' onClick={setLogout} prefilxImage={loginIcon}/>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;