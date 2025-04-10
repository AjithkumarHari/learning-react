import React from 'react';
import { useStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userLogin } from '../services/userService';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const {setIsLoggedIn, setUser, setToken} = useStore((state) => state);

    const navigate = useNavigate();

    const onSubmit = async data => {
        try {
            const response = await userLogin(data);
            setUser(response.user);
            setIsLoggedIn(true);
            setToken(response.token);
            navigate('/home');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)} >
                <div class="relative z-10 flex w-96 flex-col rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
                    <div class="mx-auto mb-2 space-y-3">
                        <h1 class="text-center text-3xl font-bold text-gray-700">Sign in</h1>
                        <p class="text-gray-500">Sign in to access your account</p>
                    </div>
                    <div>
                        <div class="relative mt-2 w-full pb-5">
                            <input {...register("email", { required: true })} type="email" id="email" class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label for="email" class="origin-[0] peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-5 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter Your Email </label>
                            {errors.email && <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3">Enter a valid email (e.g., example@gmail.com)</span>}
                        </div>
                    </div>
                    <div>
                        <div class="relative mt-2 w-full pb-5">
                            <input {...register("password", {
                                required: true,
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/
                            })} type="password" maxLength={10} id="password" class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label for="password" class="origin-[0] peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter Your Password</label>
                            {errors.password && <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3">Password must include a letter, number, and special character</span>}
                        </div>
                    </div>
                    <div class="flex w-full items-center pt-3">
                        <button class="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white" >Login</button>
                        <a class="w-full text-center text-sm font-medium text-gray-600 hover:underline" href="#">Forgot your password?</a>
                    </div>
                    <p class="text-center text-gray-600 pt-5">
                        Don't have an account?
                        <Link to="/auth/signup" class="whitespace-nowrap font-semibold text-gray-900 hover:underline pl-2">Sign up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;