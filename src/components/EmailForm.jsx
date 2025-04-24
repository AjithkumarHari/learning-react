import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from './form_elements/InputField';
import PrimaryButton from './form_elements/PrimaryButton';
import { forgotPassword } from '../services/userService';
import { useWithLoader } from '../utils/withLoader';

const EmailForm = () => {
    const withLoader = useWithLoader();

    const methods = useForm();

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        try {
            const response = await withLoader(() => forgotPassword(data.email));
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <div className='bg-white rounded-lg p-6 z-10 shadow-xl sm:mx-auto text-gray-800'>
            <div className='mb-5'>
                <h2 class="text-center text-2xl font-bold text-gray-700">Enter Existing User Email</h2>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-end items-center gap-2 w-[330px] '>
                        <InputField name="email" type="email" label="Enter Your Email" maxLength={50} rules={{ required: "This field is required" }} />
                        <div className="mb-3">
                            <PrimaryButton label="Submit" width='80px' height='45px' />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default EmailForm;