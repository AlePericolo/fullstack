import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { stringValidator } from '@/utils/yupValidations'
import { RenderInputField, RenderTextarea, RenderSelect } from "./render"

import Button from '@/templates/components/Button'

import { getCategories } from '@/store/rest'

export default function Login() {

    const dispatch = useDispatch()

    const { data: categoriesData } = getCategories();

    const { handleSubmit, register, control, reset, formState: { isSubmitted, errors, isDirty } } = useForm({
        mode: "onChange",
        resolver: yupResolver(object({
            title: stringValidator(),
            text: stringValidator(),
            category: stringValidator()
        }).required()),
        defaultValues: null
    });

    const onSubmit = (values) => {
        console.log(values)
    }    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <RenderInputField
                register={register}
                field='title'
                type='text'
                label='Title'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['title']}
            />
            <RenderInputField
                register={register}
                field='subtitle'
                type='subtitle'
                label='Subtitle'
                isSubmitted={isSubmitted}
                error={errors['subtitle']}
            />
            <RenderTextarea
                register={register}
                field='text'
                label='Text'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['text']}
            />
            <RenderSelect
                control={control}
                name='category'
                label='Category'
                options={categoriesData || []}
                isRequired
                isSubmitted={isSubmitted}
                error={errors['category']}
            />
            <div className="flex flex-wrap justify-center py-4">
                <Button type="submit"
                    btn="success"
                    disabled={!isDirty}
                    text="save" />
                <Button btn="error"
                    text="reset" 
                    onClick={() => reset()}/>
            </div>
        </form>
    )
}