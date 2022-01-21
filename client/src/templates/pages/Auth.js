import React, { useState } from 'react';

import Login from '@/templates/forms/Login';
import Register from '@/templates/forms/Register';
import Button from '@/templates/components/Button'

export default function Auth() {

    const [isLogin, setIsLogin] = useState(true)

    const renderForm = () => {
        if (isLogin) return <Login />

        return <Register setIsLogin={setIsLogin} />
    }

    return (
        <>
            {renderForm()}
            <div className="flex flex-wrap justify-center border-t border-gray-400 py-4 text-sm">
                <span className='inline-block italic py-1'>{isLogin ? 'Don\'t have an account yet?' : 'Back to'}</span>
                <Button btn="warning"
                    size="sm"
                    text={isLogin ? 'register' : 'login'} 
                    onClick={() => setIsLogin(!isLogin)}/>
            </div>
        </>
    )
}