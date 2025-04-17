import React from 'react';
import { Link } from 'react-router-dom';

const services = [
    { title: 'Active Members', link: '/memberlist' },
    { title: 'Plans', link: '/service' },
    { title: 'Courses', link: '/service' },
];

const Service = () => (
    <div className="px-10 py-5">
        <h1>Our Services</h1>
        <p>We offer a wide range of services to meet your needs.</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-10 p-7">
            {services.map(({ title, link }, idx) =>
                <Link to={link} key={idx} className='bg-[url(./assets/bg.jpg)] bg-cover bg-center h-[230px] rounded-xl flex items-center justify-center text-3xl font-bold hover:scale-110 transition-transform duration-300 hover:border-2 border-[#e0e1dd]'>
                    {title}
                </Link>
            )}
        </div>
    </div>
);

export default Service;
