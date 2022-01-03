import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string} from 'yup'

import { login } from '@/store/actions';

const loginSchema = object({
    email: string()
            .required("email is required")
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "email is invalid"),
    password: string()
            .required("password is required")
            .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "password is invalid"),
}).required();

export default function Login() {

    const dispatch = useDispatch()

    const { register, formState: { isSubmitted, errors, dirtyFields }, handleSubmit, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (values) => {
        dispatch(login(values))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input {...register("email")} 
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${isSubmitted && errors.email ? 'border-red-500' : ''}`}
                        id="email" 
                        type="text" 
                        placeholder="Type email" />
                    <p className="h-4 text-red-500 text-xs italic">{isSubmitted && errors.email?.message}</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input {...register("password")}
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isSubmitted && errors.password ? 'border-red-500' : ''}`} 
                        id="password" 
                        type="password" 
                        placeholder="Type password" />
                    <p className="h-4 text-red-500 text-xs italic">{isSubmitted && errors.password?.message}</p>
                </div>
            </div>
            <div className="flex flex-wrap justify-center py-4">
                <button type="submit" 
                        className={`inline-block py-2 px-4 mx-2 rounded transition ease-in duration-150 ${!(dirtyFields.email && dirtyFields.password) ? 'bg-gray-400 text-gray-700' : 'bg-green-400 text-green-700 hover:bg-green-300 hover:text-green-800'}`} 
                        disabled={!(dirtyFields.email && dirtyFields.password)}>
                            Login
                </button>
                <button type="button" 
                        className="inline-block py-2 px-4 mx-2 rounded bg-red-400 text-red-700 hover:bg-red-300 hover:text-red-800 transition ease-in duration-150" 
                        onClick={() => reset()}>
                            Reset
                </button>
            </div>
        </form>
    )
}