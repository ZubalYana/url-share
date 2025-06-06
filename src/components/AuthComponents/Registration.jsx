import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Registration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validate = () => {
        const newErrors = {}

        if (formData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters'
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email'
        }

        if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/.test(formData.password)) {
            newErrors.password = 'Password must be 8–16 characters, include an uppercase letter and a special symbol'
        }


        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        if (!validate()) return

        try {
            const response = await axios.post('/api/register', formData)
            console.log('User registered:', response.data)
        } catch (error) {
            console.error('Registration error:', error)
        }
    }

    const isFormIncomplete = Object.values(formData).some(value => value.trim() === '')

    return (
        <div className='bg-white shadow-xl rounded-xl hover:shadow-2xl p-4 flex flex-col items-center lg:w-[400px] lg:min-h-[500px] lg:p-6'>

            <h2 className='text-[18px] font-semibold text-center mb-3 uppercase md:text-[24px] text-[#1c1c1c]'>Sign Up</h2>
            <div className='flex flex-col w-full gap-4'>
                <TextField
                    id='name'
                    name='name'
                    label='Your name'
                    variant="outlined"
                    className='w-full'
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    id='email'
                    name='email'
                    label='Email'
                    variant="outlined"
                    className='w-full'
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    id='password'
                    name='password'
                    label='Create a unique password'
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    className='w-full'
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id='confirmPassword'
                    name='confirmPassword'
                    label='Repeat your password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    className='w-full'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <Button
                type="button"
                variant="contained"
                onClick={handleSubmit}
                disabled={isFormIncomplete}
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
                    '&.Mui-disabled': {
                        backgroundColor: '#ccc',
                    }
                }}
            >
                Create an account
            </Button>

            <p className='text-[14px] mt-5 cursor-pointer'>Already have an account?</p>
        </div>
    )
}
