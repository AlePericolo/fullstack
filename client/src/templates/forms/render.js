import React from 'react';

export const RenderInputField = ({ register, field, type, label, isSubmitted, error }) => {

    return (
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field}>
                    {label}
                </label>
                <input {...register(field)}
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${isSubmitted && error ? 'border-red-500' : ''}`}
                    id={field}
                    type={type}
                    placeholder={`Type ${label}`} />
                <p className="h-4 text-red-500 text-xs italic">{isSubmitted && error?.message}</p>
            </div>
        </div>
    )
}