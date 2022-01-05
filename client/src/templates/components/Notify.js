import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearNotify } from '@/store/actions';

import { isNil } from 'lodash';

export default function Notify() {
    
    const dispatch = useDispatch();

    const { notify } = useSelector((state) => state.app);

    const renderType = () => {
        switch(notify.type){
            case 'error': return 'red'
            case 'success': return 'green'
            case 'info': return 'indigo'
            case 'warning': return 'yellow'
        }
    }

    setTimeout(() => {
        if(isNil(notify)) return;
        dispatch(clearNotify())
    }, 3000);

    if(isNil(notify)) return null

    const type = renderType()

    return (
        <div className={`absolute z-20 w-64 h-20 inset-y-0 right-0 mr-3 mt-16 rounded
            flex justify-center items-center
            bg-${type}-300 border border-${type}-700`}>
                <span className={`text-semibold uppercase italic text-${type}-700`}>{notify.message}</span>
        </div>
    )
}