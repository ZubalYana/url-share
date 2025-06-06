import React from 'react'
import Registration from './Registration'
import Login from './Login'
export default function AuthLayout() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Registration />
            <Login />
        </div>
    )
}
