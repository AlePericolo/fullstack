import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { emailValidator, passwordValidator, compareValueValidator } from '@/utils/yupValidations'
import { RenderInputField } from "./render"

import { signup } from '@/store/actions';

const registerSchema = object({
    email: emailValidator(),
    password: passwordValidator(),
    confirmPassword: compareValueValidator('password')
}).required();

export default function Register({setIsLogin}) {

    const dispatch = useDispatch()

    const { register, formState: { isSubmitted, isSubmitSuccessful, errors, dirtyFields }, handleSubmit, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    useEffect(() => {
        if(isSubmitSuccessful) setIsLogin(true)
    }, [isSubmitSuccessful])

    const onSubmit = (values) => {
        dispatch(signup(values))
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
            <RenderInputField
                register={register}
                field='confirmPassword'
                type='password'
                label='Confirm Password'
                isSubmitted={isSubmitted}
                error={errors['confirmPassword']}
            />
            <div className="flex flex-wrap justify-center py-4">
                <button type="submit"
                    className={`inline-block py-2 px-4 mx-2 rounded transition ease-in duration-150 ${!(dirtyFields.email && dirtyFields.password && dirtyFields.confirmPassword) ? 'bg-gray-400 text-gray-700' : 'bg-green-400 text-green-700 hover:bg-green-300 hover:text-green-800'}`}
                    disabled={!(dirtyFields.email && dirtyFields.password && dirtyFields.confirmPassword)}>
                    Register
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