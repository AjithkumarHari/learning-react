import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { userRegister } from '../services/userService';
import { useLoader } from '../context/LoaderContext';
import InputField from './form_elements/InputField';
import PrimaryButton from './form_elements/PrimaryButton';

const Register = () => {
    const { showLoader, hideLoader } = useLoader();

    const methods = useForm();

    const { handleSubmit } = methods;

    const navigate = useNavigate();

    const onSubmit = async data => {
        try {
            showLoader();
            const response = await userRegister(data);
            navigate('/auth/otp', { state: { email: data.email } });
            hideLoader();
        } catch (error) {
            hideLoader();
            console.log(error);
        }
    }

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div class="relative z-10 flex w-96 flex-col rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
                        <div class="mx-auto mb-2 space-y-3">
                            <h1 class="text-center text-3xl font-bold text-gray-700">Sign up</h1>
                            <p class="text-gray-500">Sign up to register your account</p>
                        </div>
                        <div>
                            <InputField name="name" label="Enter Your Name" maxLength={50} rules={{ required: "Name is required" }} />
                        </div>
                        <div>
                            <InputField name="email" type="email" label="Enter Your Email" maxLength={50} rules={{ required: "Email is required" }} />
                        </div>
                        <div>
                            <InputField name="password" label="Enter Your Password" type="password" maxLength={10}
                                rules={{
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                                        message: "Must include a letter, number, and special character",
                                    }
                                }}
                            />
                        </div>
                        <div class="flex w-full justify-center items-center pt-3">
                            <PrimaryButton label="Register" width='120px' />
                        </div>
                        <p class="text-center text-gray-600 pt-5">
                            Already have an account?
                            <Link to="/auth/login" class="whitespace-nowrap font-semibold text-gray-900 hover:underline pl-2">Sign in</Link>
                        </p>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default Register;