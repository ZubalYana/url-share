import React from 'react'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
export default function Registration() {
    return (
        <div className='bg-white shadow-xl rounded-xl hover:shadow-2xl p-4 flex flex-col items-center lg:w-[400px] lg:h-[500px] lg:p-6'>
            <h2 className='text-[18px] font-semibold text-center mb-3 uppercase md:text-[24px] text-[#1c1c1c]'>Sign Up</h2>
            <div className='flex flex-col w-full gap-4'>
                <TextField
                    id='name'
                    label='Your name'
                    variant="outlined"
                    className='w-full'
                />
                <TextField
                    id='Your email'
                    label='Email'
                    variant="outlined"
                    className='w-full'
                />
                <TextField
                    id='Password'
                    label='Create a unique password'
                    variant="outlined"
                    className='w-full'
                />
                <TextField
                    id='PasswordRepeted'
                    label='Repeat your password'
                    variant="outlined"
                    className='w-full'
                />
            </div>
            <Button
                type="button"
                variant="contained"
                sx={{
                    mt: { xs: 2, md: 4 },
                    px: 5,
                    py: 1.5,
                    borderRadius: 2,
                    width: '250px',
                    backgroundColor: '#3255D5',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    textTransform: 'none',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',

                }}
            >
                Create an account
            </Button>
            <p className='text-[14px] mt-5 cursor-pointer'>Already have an account?</p>
        </div>
    )
}
