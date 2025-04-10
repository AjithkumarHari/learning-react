import React from 'react';
import { Link } from 'react-router-dom';

const Service = () => {

    const services = [
        {
            id: 1,
            title: 'Active Members',
            link: '/memberlist'
        },
        {
            id: 2,
            title: 'Plans'
        },
        {
            id: 3,
            title: 'Courses'
        },
    ]

    const cardItems = services.map(service =>
        <Link to={service.link} key={service.id}>
            <div className='bg-[url(./assets/bg.jpg)] bg-cover bg-center h-[230px] rounded-xl flex items-center justify-center text-3xl font-bold hover:scale-110 transition-transform duration-300 hover:border-2 border-[#e0e1dd]'>
                {service.title}
            </div>
        </Link>
    )

    return (
        <div className='px-10 py-5'>
            <h1>Our Services</h1>
            <p>We offer a wide range of services to meet your needs.</p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-10 p-7">
                {cardItems}
            </div>
        </div>
    );
};

export default Service;