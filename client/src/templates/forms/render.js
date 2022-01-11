import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

import ReactSelect from "react-select";

import { isNil, find } from 'lodash'

export const RenderInputField = ({ register, field, type, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field}>
                    {label} {isRequired && '*'}
                </label>
                <input {...register(field)}
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-none shadow py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
                    id={field}
                    type={type}
                    placeholder={`Type ${label}`} />
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderTextarea = ({ register, field, rows, label, isRequired, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field}>
                    {label} {isRequired && '*'}
                </label>
                <textarea {...register(field)}
                    rows={rows || 3}
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-none shadow py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
                    id={field}
                    placeholder={`Type ${label}`} />
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}

export const RenderSelect = ({ control, name, options, label, isRequired, isSubmitted, error }) => {

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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
                    {label} {isRequired && '*'}
                </label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) =>
                        <ReactSelect
                            {...field}
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-none shadow p-0 mb-3 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
                            styles={customStyles}
                            options={options}
                            placeholder={`Select ${label}`}
                            value={find(options, function (e) { return e._id === field.value }) || null}
                            getOptionValue={options => options._id}
                            isSearchable
                            isClearable
                            blurInputOnSelect={false}
                            onChange={e => field.onChange(e?._id || null)}
                        />
                    }
                />
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}