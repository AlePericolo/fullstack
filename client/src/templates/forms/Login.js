import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { emailValidator, passwordValidator } from '@/utils/yupValidations'
import { RenderInputField } from "./render"

import { login } from '@/store/actions';

const loginSchema = object({
    email: emailValidator(),
    password: passwordValidator(),
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
            <RenderInputField
                register={register}
                field='email'
                type='text'
                label='Email'
                isSubmitted={isSubmitted}
                error={errors['email']}
            />
            <RenderInputField
                register={register}
                field='password'
                type='password'
                label='Password'
                isSubmitted={isSubmitted}
                error={errors['password']}
            />
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