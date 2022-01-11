import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearNotify } from '@/store/actions';

import { isNil } from 'lodash';

export default function Notify() {

    const dispatch = useDispatch();

    const { notify } = useSelector((state) => state.app);

    const renderType = () => {
        switch (notify.type) {
            case 'error': return 'red'
            case 'success': return 'green'
            case 'info': return 'indigo'
            case 'warning': return 'yellow'
        }
    }

    setTimeout(() => {
        if (isNil(notify)) return;
        dispatch(clearNotify())
    }, 3000);

    if (isNil(notify)) return null

    const type = renderType()

    return (
        <div className={`absolute z-20 transform right-1/2 translate-x-1/2 lg:right-0 lg:translate-x-0 lg:mx-5 mt-20`}>
            <div className={`h-20 w-64 px-5 py-2 flex justify-center items-center rounded text-semibold uppercase italic bg-${type}-300 border border-${type}-700 text-${type}-700`}>
                {notify.message}
            </div>
        </div>
    )
}