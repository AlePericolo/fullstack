import React from 'react';

export default function Card({title, children}) {

    return (
        <div className='mt-5 flex justify-center items-center'>
            <div className='w-2/3 md:w-1/2 xl:w-1/3 bg-white border border-l-8 border-indigo-700 rounded-none shadow p-5'>
                <h1 className='antialiased text-center font-medium uppercase tracking-widest mb-3'>{title || ''}</h1>
                {children}
            </div>
        </div>
    )
}