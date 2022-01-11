import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { stringValidator } from '@/utils/yupValidations'
import { RenderInputField, RenderTextarea, RenderSelect } from "./render"

import { getCategories } from '@/store/rest'
import { string } from 'yup/lib/locale';

const newAricleSchema = object({
    title: stringValidator(),
    text: stringValidator(),
    category: stringValidator()
}).required();

export default function Login() {

    const dispatch = useDispatch()

    const { data: categoriesData } = getCategories();

    const { handleSubmit, register, control, reset, formState: { isSubmitted, errors, dirtyFields } } = useForm({
        mode: "onChange",
        resolver: yupResolver(newAricleSchema)
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
                rows='5'
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
                <button type="submit"
                    className={`inline-block py-2 px-4 mx-2 rounded transition ease-in duration-150 ${!(dirtyFields.title && dirtyFields.text) ? 'bg-gray-400 text-gray-700' : 'bg-green-400 text-green-700 hover:bg-green-300 hover:text-green-800'}`}
                    disabled={!(dirtyFields.title && dirtyFields.text)}>
                    Save
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