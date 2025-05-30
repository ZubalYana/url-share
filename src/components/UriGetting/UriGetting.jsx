import React, { useRef, useState } from 'react';
import './UriGetting.css';
import { Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UriGetting() {
    const inputsRef = useRef([]);
    const [uri, setUri] = useState('');
    const [isUri, setIsUri] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9a-zA-Z]?$/.test(value)) return;

        e.target.value = value.toUpperCase();

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('Text').toUpperCase().replace(/[^0-9A-Z]/g, '');

        if (paste.length === 6) {
            paste.split('').forEach((char, i) => {
                if (inputsRef.current[i]) {
                    inputsRef.current[i].value = char;
                }
            });
            inputsRef.current[5]?.focus(); // фокус на останнє поле
        }

        e.preventDefault(); // запобігаємо вставці в одне поле
    };

    const handleButtonClick = async () => {
        if (!isUri) {
            const code = inputsRef.current.map(input => input.value).join('');
            if (code.length === 6) {
                try {
                    const res = await fetch(`http://localhost:5000/api/uri/${code}`);
                    if (!res.ok) throw new Error('Code not found');
                    const data = await res.json();
                    setUri(data.uri);
                    setIsUri(true);
                    toast.success('URI found!');
                } catch (err) {
                    toast.error(err.message);
                }
            } else {
                toast.error('Please enter 6 characters');
            }
        } else {
            try {
                await navigator.clipboard.writeText(uri);
                toast.success('URI copied to clipboard!');
            } catch {
                toast.error('Failed to copy URI!');
            }
        }
    };

    const handleReset = () => {
        inputsRef.current.forEach(input => {
            if (input) input.value = '';
        });
        setUri('');
        setIsUri(false);
        inputsRef.current[0]?.focus();
        toast.success('URI reset!');
    };

    return (
        <div className="uriLogicSection">
            <h3 className="uriLogicSection_title">Get a URI</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                {[...Array(6)].map((_, index) => (
                    <TextField
                        key={index}
                        inputRef={(el) => (inputsRef.current[index] = el)}
                        inputProps={{
                            maxLength: 1,
                            style: {
                                textAlign: 'center',
                                fontSize: '24px',
                                width: '40px',
                                maxHeight: '56px',
                                fontFamily: 'fredoka',
                            },
                        }}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        variant="outlined"
                        placeholder='X'
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                '& fieldset': {
                                    borderColor: '#aaa',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#888',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#673ab7',
                                },
                            },
                            '& input::placeholder': {
                                color: '#1E1E1E',
                                opacity: 1,
                            },
                        }}
                    />
                ))}
            </div>

            {isUri && (
                <div style={{ paddingTop: '15px', fontWeight: '600', fontSize: '16px', color: '#333' }}>
                    Your URI: <span style={{ color: '#3255D5' }}>{uri}</span>
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Button
                    onClick={handleButtonClick}
                    variant="contained"
                    sx={{
                        backgroundColor: '#3255D5',
                        color: '#fff',
                        borderRadius: '10px',
                        width: '180px',
                        height: '55px',
                        fontSize: '16px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        '&:hover': {
                            backgroundColor: '#2C48AA',
                        },
                    }}
                >
                    {isUri ? 'COPY THE URI' : 'GET THE URI'}
                </Button>

                <Button
                    onClick={handleReset}
                    variant="outlined"
                    color="secondary"
                    sx={{
                        borderRadius: '10px',
                        width: '80px',
                        height: '55px',
                        fontSize: '16px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                    }}
                >
                    RESET
                </Button>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
