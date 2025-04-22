import React, { useEffect, useRef, useState } from 'react';
import { resendOTP, verifyOTP } from '../services/userService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { useStore } from '../store/authStore';

const OTPInput = () => {
    const inputsRef = useRef([]);

    const { showLoader, hideLoader } = useLoader();

    const { setIsLoggedIn, setUser, setToken } = useStore((state) => state);

    const navigate = useNavigate();

    const location = useLocation();
    const email = location.state?.email;

    const [timeLeft, setTimeLeft] = useState(5 * 60);
    const [otp, setOtp] = useState(new Array(6).fill(''));

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    const startTimer = () => {
        setTimeLeft(5 * 60);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleChange = (e, index) => {
        const rawValue = e.target.value;
        const value = rawValue.replace(/\D/, '');

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newOtp.join('').length === 6) {
            sendOtp(newOtp.join(''));
        }
    };

    const sendOtp = async (otp) => {
        try {
            showLoader();
            const response = await verifyOTP(otp, email);
            setUser(response.user);
            setIsLoggedIn(true);
            setToken(response.token);
            navigate('/home');
            hideLoader();
        } catch (error) {
            hideLoader();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    const resendOtp = async () => {
        try {
            showLoader();
            const response = await resendOTP(email);
            setOtp(new Array(6).fill(''));
            startTimer();
            hideLoader();
        } catch (error) {
            hideLoader();
        }
    }

    return (
        <div className='bg-white rounded-lg p-8 z-10 shadow-xl sm:mx-auto'>
            <div className='mb-5'>
                <h2 class="text-center text-3xl font-bold text-gray-700">Enter OTP</h2>
                <p className='text-gray-700 text-sm text-center pt-2'> OTP have been send to  <span className='text-gray-700 font-bold text-md'> {email} </span> </p>
            </div>
            <div className="flex gap-2 text-gray-700">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center border rounded text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <p className='text-gray-400 text-sm'>
                    The OTP is only valid for
                    <span className='text-gray-700 font-bold text-md'> {minutes}:{seconds < 10 ? `0${seconds}` : seconds} </span> minutes
                </p>
            </div>
            <div>
                <p class="text-center text-gray-600 pt-3">
                    Have you not received any email?
                    <span onClick={resendOtp} class="whitespace-nowrap font-semibold text-gray-900 hover:underline pl-2">Resent OTP</span>
                </p>
            </div>
        </div>
    );
};

export default OTPInput;
