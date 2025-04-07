import React, { useEffect } from 'react';
import { getUsers } from '../services/userService';

const Service = () => {

    const services = [
        {
            id: 1,
            title: 'Counter'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 2,
            title: 'Hooks'
        },
        {
            id: 3,
            title: 'Props'
        }
    ]

    const api = "";

    const getAllUsersData = async () => {
        try {
            const response = await getUsers();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsersData();
    });
    const cardItems = services.map(service =>
        <div className='bg-[#778da9] h-32 rounded-xl flex items-center justify-center text-2xl font-bold hover:scale-110 transition-transform duration-300 hover:border-2 border-[#e0e1dd]'>
            {service.title}
        </div>
    )

    return (
        <div className='px-10 py-5'>
            <h1>Our Services</h1>
            <p>We offer a wide range of services to meet your needs.</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-10 p-7">
                {cardItems}
            </div>
        </div>
    );
};

export default Service;