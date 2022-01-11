import React from 'react';
import { Link } from 'react-router-dom';

import {isNil} from 'lodash'

export default function Button({ type, btn, size, style, text, icon, onClick, href, disabled }) {

    const getBtnType = () => {
        if(disabled) return 'gray'

        switch (btn) {
            case 'success': return 'green'
            case 'error': return 'red'
            case 'info': return 'indigo'
            case 'warning': return 'yellow'
            default: return 'gray'
        }
    }

    const getSize = () => {
        switch(size) {
            case 'sm': return 'py-1 px-2 text-sm'
            case 'lg': return 'py-5 px-10 text-lg'
            default: return 'py-2 px-4 textt-base'
        }
    }

    const btnType = getBtnType()
    const btnSize = getSize()

    const getHover = () => {
        if(disabled) return 'cursor-not-allowed'

        return `hover:bg-${btnType}-500 hover:text-${btnType}-300 border-${btnType}-900 transition ease-in duration-150`
    }

    const hover = getHover()

    const btnClass = `mx-2 inline-block
                        ${icon ? 'flex items-center' : ''}
                        no-underline leading-snug rounded-none shadow uppercase font-medium border
                        ${btnSize}
                        bg-${btnType}-300 text-${btnType}-700 border-${btnType}-700
                        ${hover}
                        ${style || ''}`;

    
    if(isNil(href))
        return <button type={type || 'button'} 
                        className={btnClass} 
                        onClick={onClick}
                        disabled={disabled || false}>
                    {icon}
                    <span className='mx-2'>{text}</span>
                </button>
    
    return <Link to={href} 
                className={btnClass}
                disabled={disabled || false}>
                {icon}
                <span className='mx-2'>{text}</span>
            </Link>
}
