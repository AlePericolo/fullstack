import React from 'react';

import { useDispatch } from 'react-redux';

import { setNotify } from '@/store/actions';

export default function Test() {
    
    const dispatch = useDispatch();

    return (
        <>
        <h1>Test</h1>
        <button className='bg-blue-700 text-blue-200 px-4 py-2 m-10 rounded'
        onClick={() => dispatch(setNotify({type: 'info', message: 'Test'}))}>Test</button>
        </>
    )
}