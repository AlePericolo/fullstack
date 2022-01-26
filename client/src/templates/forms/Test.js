import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { numberValidator, doubleValidator, stringValidator, checkboxValidator, radioValidator, arrayValidator, dateValidator } from '@/utils/yupValidations'
import { RenderInputField, RenderCheckbox, RenderRadioButton, RenderTextarea, RenderSelect, RenderDatePicker } from "./render"

import Button from '@/templates/components/Button'

export default function FormTest() {

    const { register, formState: { isSubmitted, errors, isDirty }, handleSubmit, getValues, control, reset } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(object({
            number: numberValidator(),
            double: doubleValidator(),
            string: stringValidator(),
            checkbox: checkboxValidator(),
            radio: radioValidator(),
            text: stringValidator(),
            select: stringValidator(),
            multi: arrayValidator(),
            date: dateValidator()
        }).required()),
        defaultValues: {}
    });

    const options = [{_id: 1, label: "a"},{_id: 2, label: "b"},{_id: 3, label: "c"}]

    const onSubmit = (values) => {
        console.log("values => ", values)
    }    

    console.log("Error ", errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <RenderInputField
                register={register}
                field='number'
                type='number'
                label='Number'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['number']}
            />
            <RenderInputField
                register={register}
                field='double'
                type='number'
                label='Double'
                isRequired
                step="0.01"
                isSubmitted={isSubmitted}
                error={errors['double']}
            />
            <RenderInputField
                register={register}
                field='string'
                type='text'
                label='String'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['string']}
            />
            <RenderCheckbox
                register={register}
                field='checkbox'
                label='Checkbox'
                isRequired
                isSubmitted={isSubmitted}
                error={errors['checkbox']}
            />
            <RenderRadioButton
                register={register}
                field='radio'
                label='Radio'
                options={options}
                isRequired
                isSubmitted={isSubmitted}
                error={errors['radio']}
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
                name='select'
                label='Select'
                options={options}
                isRequired
                isSubmitted={isSubmitted}
                error={errors['select']}
            />
            <RenderSelect
                control={control}
                name='multi'
                label='Multi'
                options={options}
                isMulti
                isRequired
                isSubmitted={isSubmitted}
                error={errors['multi']}
            />
            <RenderDatePicker
                control={control}
                name='date'
                label='Date'
                isRequired
                isSubmitted={isSubmitted}
                minDate={new Date()}
                error={errors['date']}
            />
            <div className="flex flex-wrap justify-center py-4">
                <Button type="submit"
                    btn="success"
                    disabled={!isDirty}
                    text="save" />
                <Button btn="error"
                    text="reset" 
                    onClick={() => reset()}/>
                <Button btn="warning"
                    text="values"
                    onClick={() => {alert(JSON.stringify(getValues()))}} />
            </div>
        </form>
    )
}