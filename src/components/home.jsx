import React from 'react';
import { useStore } from '../store/authStore';

const Home = () => {

    const user = useStore((state) => state.user);

    return (
        <div className='flex flex-col items-center justify-center h-[90vh] bg-cover bg-center'>
            {/* bg-[url(./assets/bg.webp)] */}
            <div>
                <h1>{user ? `Welcome ${user.name}!` : 'Please log in'}</h1>
            </div>
            <p>This is the home page of our React application.</p>
        </div>
    );
};

export default Home;