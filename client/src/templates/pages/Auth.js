import React, { useState } from 'react';

import Login from '@/templates/forms/Login';
import Register from '@/templates/forms/Register';

export default function Auth() {

    const [isLogin, setIsLogin] = useState(true)

    const renderForm = () => {
        if (isLogin) return <Login />

        return <Register setIsLogin={setIsLogin}/>
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-2/3 md:w-1/2 xl:w-1/3 bg-white border border-l-8 border-indigo-700 shadow rounded p-5'>
                {renderForm()}
                <div className="flex flex-wrap justify-center border-t border-gray-400 py-4 text-sm">
                    <span className='inline-block italic py-1'>{isLogin ? 'Don\'t have an account yet?' : 'Back to'}</span>
                    <span className='inline-block rounded-full ml-2 px-3 py-1 font-semibold bg-yellow-400 text-yellow-700 hover:bg-yellow-300 hover:text-yellow-800'
                        role="button"
                        onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'register' : 'login'}
                    </span>
                </div>
            </div>
        </div>
    )
}