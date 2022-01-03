import React from 'react';

import { Link } from 'react-router-dom';


export default function NotFound() {

    return (
        <div className='flex justify-center items-center'>
            <div className="error">
                <div className="face">
                    <div className="band">
                        <div className="red"></div>
                        <div className="white"></div>
                        <div className="blue"></div>
                    </div>
                    <div className="eyes"></div>
                    <div className="dimples"></div>
                    <div className="mouth"></div>
                </div>
                <h1>404 - Page Not Found</h1>
            </div>
        </div>
    )
}