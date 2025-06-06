import React, { useState } from 'react'
import Registration from './Registration'
import Login from './Login'

export default function AuthLayout() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="w-full h-screen flex justify-center items-center">
            {isLogin ? (
                <Login switchToRegister={() => setIsLogin(false)} />
            ) : (
                <Registration switchToLogin={() => setIsLogin(true)} />
            )}
        </div>
    )
}
