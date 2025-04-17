import React from 'react';
import { useLoader } from '../context/LoaderContext.jsx';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
    const { loading } = useLoader();

    if (!loading) return null;

    return (
        <div className="fixed flex items-center justify-center inset-0  z-[9999] h-screen bg-black/50">
            <ThreeCircles height={80} width={80} color="#784ba0" />
        </div>
    );
};

export default Loader;