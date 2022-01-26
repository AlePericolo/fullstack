import React from "react";
import { Controller } from "react-hook-form";

import ReactSelect from "react-select";
import ReactDatePicker from "react-datepicker";

import { includes } from 'lodash'

export const RenderInputField = ({ register, field, type, step, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`form-label mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={field}>
                    {label} {isRequired && '*'}
                </label>
                <input {...register(field)}
                    className={`${isSubmitted && error ? 'border-red-500' : 'border-gray-500'}`}
                    id={field}
                    type={type}
                    step={step || null}
                    placeholder={`Type ${label}`} />
                <p className="form-error">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderCheckbox = ({ register, field, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className="flex items-center">
                    <input {...register(field)}
                        id={field}
                        type="checkbox" />
                    <span className={`form-label ml-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                        htmlFor={field}>
                        {label} {isRequired && '*'}
                    </span>
                </label>
                <p className="form-error">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderRadioButton = ({ register, field, options, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`form-label mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}>
                    {label} {isRequired && '*'}
                </label>
                {(options || []).map((o, index) => (
                    <div className="flex mb-2" key={index}>
                        <input {...register(field)}
                            id={o._id}
                            value={o._id}
                            type="radio" />
                        <label htmlFor={o._id} className="form-label ml-2 text-gray-700">
                            {o.label}
                        </label>
                    </div>
                ))}
                <p className="form-error">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderTextarea = ({ register, field, rows, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`form-label mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={field}>
                    {label} {isRequired && '*'}
                </label>
                <textarea {...register(field)}
                    rows={rows || 3}
                    className={`${isSubmitted && error ? 'border-red-500' : 'border-gray-500'}`}
                    id={field}
                    placeholder={`Type ${label}`} />
                <p className="form-error">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderSelect = ({ control, name, options, isMulti, label, isRequired, isSubmitted, error }) => {

    const customStyles = {
        control: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: isFocused ? '#fff' : 'transparent',
            border: 0,
            borderRadius: 0,
            boxShadow: isFocused ? 'none' : 'none'
        }),
        menu: (styles) => ({
            ...styles,
            borderRadius: 0,
            marginTop: '5px'
        }),
        menuList: (styles) => ({
            ...styles,
            padding: 0
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? '#6b7280'
                    : isFocused
                        ? '#e5e7eb'
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? '#fff'
                    : '#000',
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? '#fff'
                        : '#e5e7eb'
                    : undefined,
            },
        })
    }

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`form-label mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={name}>
                    {label} {isRequired && '*'}
                </label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) =>
                        <ReactSelect
                            className={`p-0 mb-1 shadow leading-tight bg-gray-200 text-gray-700 focus:bg-white border ${isSubmitted && error ? 'border-red-500' : 'border-gray-500'}`}
                            styles={customStyles}
                            placeholder={`Select ${label}`}
                            getOptionValue={options => options._id}
                            isSearchable
                            isClearable
                            blurInputOnSelect={false}
                            options={options || []}
                            isMulti={isMulti || false}
                            value={
                                isMulti ?
                                    options.filter((o) => includes(field.value, o._id))
                                    :
                                    options.filter((o) => field.value === o._id)
                            }
                            onChange={option => {
                                isMulti ?
                                    field.onChange((option || []).map((e) => e._id))
                                    :
                                    field.onChange(option?._id || undefined)
                            }}
                        />
                    }
                />
                <p className="form-error">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderDatePicker = ({ control, name, label, dateFormat, showTime, todayButton, minDate, maxDate, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`form-label mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={name}>
                    {label} {isRequired && '*'}
                </label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) =>
                        <ReactDatePicker
                            className={`block w-full mb-1 py-3 px-4 border rounded-none shadow leading-tight bg-gray-200 text-gray-700 focus:outline-none focus:outline-none focus:bg-white focus:ring-0 focus:border-gray-500 ${isSubmitted && error ? 'border-red-500' : 'border-gray-500'}`}
                            placeholderText={`Select ${label}`}
                            dateFormat={dateFormat || "dd/MM/yyyy"}
                            showTimeSelect={showTime || false}
                            todayButton={todayButton || "Today"}
                            //peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            isClearable
                            minDate={minDate || null}
                            maxDate={maxDate || null}
                            selected={field.value || null}
                            onChange={value => {
                                field.onChange(value)
                            }}
                        />
                    }
                />
                <p className="form-error">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}