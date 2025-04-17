import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { useLoader } from '../context/LoaderContext';
import { toast } from 'react-toastify';

const MemberList = () => {

    const [members, setMembers] = useState([]);
    const { showLoader, hideLoader } = useLoader();

    const getAllUsersData = async () => {
        try {
            showLoader();
            const users = await getUsers();
            hideLoader();
            setMembers(users);
        } catch (error) {
            hideLoader();
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div className='px-10 py-5'>
            <h1>Active Members</h1>
            <p>Welcome to our website. We are dedicated to providing the best service possible.</p>
            <div>
                {members && members.length > 0 ? (
                    members.map((member) => (
                        <div class="flex flex-row rounded-xl border border-gray-200/80 bg-white p-4 m-4 shadow-md hover:scale-105 transition-transform duration-300">
                            <div class="relative">
                                <img class="w-20 h-20 rounded-full object-cover" src={member.profileImage ? member.profileImage : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'} alt="User" />
                                <div
                                    class="absolute -right-3 bottom-5 h-5 w-5 sm:top-2 rounded-full border-4 border-white bg-green-400 sm:invisible md:visible"
                                    title="User is online">
                                </div>
                            </div>
                            <div class="flex flex-col px-6">
                                <div class="flex h-8 flex-row">
                                    <a href="https://github.com/EgoistDeveloper/" target="_blank">
                                        <h2 class="text-lg font-semibold text-gray-600">{member.name}</h2>
                                    </a>
                                    <svg class="my-auto ml-2 h-5 fill-blue-600" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                                    </svg>
                                </div>
                                <div class="my-2 flex flex-row space-x-2">
                                    <div class="flex flex-row">
                                        <svg class="h-4 w-4 fill-gray-500/80" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                            <path
                                                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                                        </svg>

                                        <div class="text-xs text-gray-400/80 hover:text-gray-400">Fullstack Developer</div>
                                    </div>
                                    <div class="flex flex-row">
                                        <svg class="h-4 w-4 fill-gray-500/80" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                            <path
                                                d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
                                        </svg>

                                        <div class="text-xs text-gray-400/80 hover:text-gray-400">{member.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 flex flex-grow flex-col items-end justify-start">
                                <div class="flex flex-row space-x-3">
                                    <svg class="fill-gray-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex justify-center h-[500px]'>
                        <h1>No members available</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberList;