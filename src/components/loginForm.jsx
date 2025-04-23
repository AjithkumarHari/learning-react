import React from 'react';
import { useStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { userLogin } from '../services/userService';
import { useLoader } from '../context/LoaderContext';
import InputField from './form_elements/InputField';
import PrimaryButton from './form_elements/PrimaryButton';

const Login = () => {
    const { showLoader, hideLoader } = useLoader();

    const methods = useForm();

    const { handleSubmit } = methods;

    const { setUser, setToken } = useStore((state) => state);

    const navigate = useNavigate();

    const onSubmit = async data => {
        try {
            showLoader();
            const response = await userLogin(data);
            if (response.otpSent) {
                navigate('/auth/otp', { state: { email: data.email } });
            } else {
                setUser(response.user);
                setToken(response.token);
                navigate('/home');
            }
            hideLoader();
        } catch (error) {
            hideLoader();
        }
    }

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div class="relative z-10 flex w-96 flex-col rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
                        <div class="mx-auto mb-2 space-y-3">
                            <h1 class="text-center text-3xl font-bold text-gray-700">Sign in</h1>
                            <p class="text-gray-500">Sign in to access your account</p>
                        </div>
                        <div>
                            <InputField name="email" type="email" label="Enter Your Email" maxLength={50} rules={{ required: "This field is required" }} />
                        </div>
                        <div>
                            <InputField name="password" label="Enter Your Password" type="password" maxLength={10}
                                rules={{
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                                        message: "Must include a letter, number, and special character",
                                    },
                                }}
                            />
                        </div>
                        <div class="flex w-full items-center justify-evenly pt-3">
                            <PrimaryButton label="Login" width='120px' />
                            <a class=" text-center text-sm font-medium text-gray-600 hover:underline" href="#">Forgot your password?</a>
                        </div>
                        <p class="text-center text-gray-600 pt-5">
                            Don't have an account?
                            <Link to="/auth/signup" class="whitespace-nowrap font-semibold text-gray-900 hover:underline pl-2">Sign up</Link>
                        </p>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default Login;