import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { emailValidator, passwordValidator, compareValueValidator } from '@/utils/yupValidations'
import { RenderInputField } from "./render"

import Button from '@/templates/components/Button'

import { signup } from '@/store/actions';

export default function Register({setIsLogin}) {

    const dispatch = useDispatch()

    const { register, formState: { isSubmitted, isSubmitSuccessful, errors, isDirty }, handleSubmit, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(object({
            email: emailValidator(),
            password: passwordValidator(),
            confirmPassword: compareValueValidator('password')
        }).required())
    });

    useEffect(() => {
        if(isSubmitSuccessful) setIsLogin(true)
    }, [isSubmitSuccessful])

    const onSubmit = (values) => {
        dispatch(signup(values))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <RenderInputField
                register={register}
                field='email'
                type='text'
                label='Email'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['email']}
            />
            <RenderInputField
                register={register}
                field='password'
                type='password'
                label='Password'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['password']}
            />
            <RenderInputField
                register={register}
                field='confirmPassword'
                type='password'
                label='Confirm Password'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['confirmPassword']}
            />
            <div className="flex flex-wrap justify-center py-4">
                <Button type="submit"
                    btn="success"
                    size="sm"
                    disabled={!isDirty}
                    text="register" />
                <Button btn="error"
                    size="sm"
                    text="reset" 
                    onClick={() => reset()}/>
            </div>
        </form>
    )
}