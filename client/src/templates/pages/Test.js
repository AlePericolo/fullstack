import React from 'react';

import { useDispatch } from 'react-redux';

import { FaBell } from 'react-icons/fa';
import Button from '@/templates/components/Button'

import { setNotify } from '@/store/actions';

export default function Test() {
    
    const dispatch = useDispatch();

    return (
        <>
        <h1>Test</h1>
        <Button btn="info"
                size="lg"
                text="notify"
                icon={<FaBell />}
                onClick={() => dispatch(setNotify({type: 'info', message: 'notify message'}))}/>
        </>
    )
}