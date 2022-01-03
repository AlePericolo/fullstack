import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearAlert } from '@/store/actions';

import { isNil } from 'lodash';

export default function Alert() {
    
    const dispatch = useDispatch();

    const { alertMessage } = useSelector((state) => state.app);

    const renderAlertType = () => {
        if(isNil(alertMessage)) return ''

        switch(alertMessage.type){
            case 'error': return 'text-red-500'
            case 'success': return 'text-green-500'
            case 'info': return 'text-indigo-500'
            case 'warning': return 'text-yellow-500'
            default: return 'text-gray-500'
        }
    }

    const renderAlertMessage = () => {
        if(isNil(alertMessage)) return null

        return alertMessage.message
    }

    setTimeout(() => {
        if(isNil(alertMessage)) return;
        dispatch(clearAlert())
    }, 3000);

    return <p className={`h-10 flex flex-wrap justify-center items-center font-semibold uppercase underline ${renderAlertType()}`}>
                {renderAlertMessage()}
            </p>
}