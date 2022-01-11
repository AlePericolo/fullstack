import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { emailValidator, passwordValidator } from '@/utils/yupValidations'
import { RenderInputField } from "./render"

import Button from '@/templates/components/Button'

import { login } from '@/store/actions';

export default function Login() {

    const dispatch = useDispatch()

    const { register, formState: { isSubmitted, errors, isDirty }, handleSubmit, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(object({
            email: emailValidator(),
            password: passwordValidator(),
        }).required())
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
            <div className="flex flex-wrap justify-center py-4">
                <Button type="submit"
                    btn="success"
                    disabled={!isDirty}
                    text="login" />
                <Button btn="error"
                    text="reset" 
                    onClick={() => reset()}/>
            </div>
        </form>
    )
}