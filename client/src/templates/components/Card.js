import React from 'react';

export default function Card({title, children}) {

    return (
        <div className='my-5 mx-auto w-11/12 md:w-8/12 lg:w-6/12'>
            <div className='bg-white border border-l-8 border-gray-700 rounded-none shadow p-5'>
                <h1 className='antialiased text-center font-medium uppercase tracking-widest mb-3'>{title || ''}</h1>
                <div className='flex justify-center items-center '>
                {children}
                </div>
            </div>
        </div>
    )
}