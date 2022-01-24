import React from "react";
import { Controller } from "react-hook-form";

import ReactSelect from "react-select";
import ReactDatePicker from "react-datepicker";

import { includes } from 'lodash'

export const RenderInputField = ({ register, field, type, step, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={field}>
                    {label} {isRequired && '*'}
                </label>
                <input {...register(field)}
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-none shadow py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
                    id={field}
                    type={type}
                    step={step || null}
                    placeholder={`Type ${label}`} />
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
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
                        className="form-checkbox text-gray-700 h-4 w-4"
                        id={field}
                        type="checkbox" />
                    <span className={`block uppercase tracking-wide text-xs font-bold ml-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                        htmlFor={field}>
                        {label} {isRequired && '*'}
                    </span>
                </label>
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderRadioButton = ({ register, field, options, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}>
                    {label} {isRequired && '*'}
                </label>
                {(options || []).map((o, index) => (
                    <div className="flex mb-2" key={index}>
                        <input {...register(field)}
                            className="h-4 w-4"
                            id={o._id}
                            value={o._id}
                            type="radio" />
                        <label htmlFor={o._id} className="block uppercase tracking-wide text-xs font-bold ml-2 text-gray-700">
                            {o.label}
                        </label>
                    </div>
                ))}
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderTextarea = ({ register, field, rows, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={field}>
                    {label} {isRequired && '*'}
                </label>
                <textarea {...register(field)}
                    rows={rows || 3}
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-none shadow py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
                    id={field}
                    placeholder={`Type ${label}`} />
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderSelect = ({ control, name, options, isMulti, label, isRequired, isSubmitted, error }) => {

    const customStyles = {
        control: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: isFocused ? 'white' : 'transparent',
            minHeight: 45,
            boxShadow: "none",
            border: "none",
            borderRadius: 0
        }),
        menu: (styles) => ({
            ...styles,
            borderRadius: 0,
            marginTop: "5px"
        }),
        menuList: (styles) => ({
            ...styles,
            padding: 0
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? "rgba(200, 200, 200)"
                    : isFocused
                        ? "rgba(229, 231, 235)"
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? 'white'
                    : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? 'white'
                        : 'rgba(229, 231, 235)'
                    : undefined,
            },
        })
    }

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={name}>
                    {label} {isRequired && '*'}
                </label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) =>
                        <ReactSelect
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-none shadow p-0 mb-1 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
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
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderDatePicker = ({ control, name, label, dateFormat, showTime, todayButton, minDate, maxDate, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isSubmitted && error ? 'text-red-700' : 'text-gray-700'}`}
                    htmlFor={name}>
                    {label} {isRequired && '*'}
                </label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) =>
                        <ReactDatePicker
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-none shadow py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
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
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}