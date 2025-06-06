import React, { useState } from 'react'
import { TextField, Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login({ switchToRegister }) {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const isDisabled = !email.trim() || !password.trim() || loading

    const handleSubmit = async () => {
        setLoading(true)
        setError('')

        try {
            const response = await axios.post('/api/login', { email, password })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white shadow-xl rounded-xl hover:shadow-2xl p-4 flex flex-col items-center lg:w-[400px] lg:min-h-[300px] lg:p-6">
            <h2 className="text-[18px] font-semibold text-center mb-3 uppercase md:text-[24px] text-[#1c1c1c]">Log in</h2>

            <div className="flex flex-col w-full gap-4">
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    className="w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />

                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    className="w-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <Button
                type="button"
                variant="contained"
                disabled={isDisabled}
                onClick={handleSubmit}
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
                    },
                }}
            >
                {loading ? 'Logging in...' : 'Log in'}
            </Button>

            <p
                onClick={switchToRegister}
                className="text-[14px] mt-5 cursor-pointer hover:scale-105 transition-all duration-300"
            >
                Don't have an account yet?
            </p>
        </div>
    )
}
