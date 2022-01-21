import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { stringValidator, arrayValidator } from '@/utils/yupValidations'
import { RenderInputField, RenderTextarea, RenderSelect, RenderDatePicker } from "./render"

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
            category: stringValidator(),
            categories: arrayValidator(),
        }).required()),
        defaultValues: null
    });

    const onSubmit = (values) => {
        console.log(values)
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
            {/* <RenderSelect
                control={control}
                name='categories'
                label='Categories'
                options={categoriesData || []}
                isMulti
                isRequired
                isSubmitted={isSubmitted}
                error={errors['categories']}
            />
            <RenderDatePicker
                control={control}
                name='date'
                label='Date'
                isRequired
                isSubmitted={isSubmitted}
                minDate={new Date()}
                isRange={true}
                //error={errors['categories']}
            /> */}
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