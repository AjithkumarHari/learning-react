import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from './form_elements/InputField';
import PrimaryButton from './form_elements/PrimaryButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { userUpdate, verifyOTP } from '../services/userService';
import { useStore } from '../store/authStore';
import { useWithLoader } from '../utils/withLoader';

const ChangePassword = () => {
    const withLoader = useWithLoader();

    const [notMatch, setNotMatch] = useState(false);

    const [userDetails, setUserDetails] = useState(null);

    const { setUser, setToken } = useStore((state) => state);

    const methods = useForm();

    const { handleSubmit } = methods;

    const navigate = useNavigate();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const { token, email } = Object.fromEntries(queryParams.entries());

    useEffect(() => {
        verifyToken(token)
    }, [])

    const verifyToken = async () => {
        try {
            const response = await withLoader(() => verifyOTP(token, email));
            if (response) {
                setUser(response.user);
                setToken(response.token);
                setUserDetails(response.user);
            } else {
                navigate('/*');
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            navigate('/*');
        }
    }

    const onSubmit = async (data) => {
        try {
            if (data.newPassword !== data.confPassword) {
                setNotMatch(true);
                return;
            }
            const response = await withLoader(() => userUpdate(userDetails.id, { password: data.newPassword }));
            if (response) {
                setUser(response.user);
                navigate('/home');
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    }

    return (
        <div className='bg-white rounded-lg p-6 z-10 shadow-xl sm:mx-auto text-gray-800 w-[370px]'>
            <div className='mb-5'>
                <h2 class="text-center text-2xl font-bold text-gray-700">Change Password</h2>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField name="newPassword" label="Enter New Password" type="password" maxLength={10}
                        rules={{
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                                message: "Must include a letter, number, and special character",
                            },
                        }}
                    />
                    <InputField name="confPassword" label="Confirm New Password" type="password" maxLength={10}
                        rules={{
                            required: "Password confirmation required",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                                message: "Must include a letter, number, and special character",
                            },
                        }}
                        onChange={() => setNotMatch(false)}
                        customError={notMatch ? "Passwords do not match" : ""}
                    />
                    <div className='flex justify-end'><PrimaryButton label="Change Password" /></div>
                </form>
            </FormProvider>
        </div>
    );
};

export default ChangePassword;