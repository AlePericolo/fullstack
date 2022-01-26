import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { stringValidator, arrayValidator } from '@/utils/yupValidations'
import { RenderInputField, RenderTextarea, RenderSelect, RenderDatePicker } from "./render"

import Button from '@/templates/components/Button'

import { getCategories } from '@/store/rest'

export default function Article() {

    const dispatch = useDispatch()

    const { data: categoriesData } = getCategories();

    const {  register, formState: { isSubmitted, errors, isDirty }, handleSubmit, control, reset,  } = useForm({
        mode: "onChange",
        resolver: yupResolver(object({
            title: stringValidator(),
            text: stringValidator(),
            categories: arrayValidator(),
        }).required()),
        defaultValues: null
    });

    const onSubmit = (values) => {
        console.log("values => ", values)
    }    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                type='text'
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
                name='categories'
                label='Categories'
                options={categoriesData || []}
                isMulti
                isRequired
                isSubmitted={isSubmitted}
                error={errors['categories']}
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