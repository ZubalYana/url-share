import React, { useState, useRef } from 'react';
import './UriSharing.css';
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UriSharing() {
    const [isCode, setIsCode] = useState(false);
    const [code, setCode] = useState('');
    const [uri, setUri] = useState('');
    const [usePin, setUsePin] = useState(false);
    const [pinDigits, setPinDigits] = useState(Array(4).fill(''));
    const inputsRef = useRef([]);

    const isValidUri = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 1);
        const newDigits = [...pinDigits];
        newDigits[index] = val;
        setPinDigits(newDigits);

        if (val && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, 4);
        const newDigits = Array(4).fill('');
        for (let i = 0; i < pasted.length; i++) {
            newDigits[i] = pasted[i];
        }
        setPinDigits(newDigits);
        pasted.split('').forEach((char, i) => {
            if (inputsRef.current[i]) {
                inputsRef.current[i].value = char;
            }
        });
        inputsRef.current[pasted.length - 1]?.focus();
        e.preventDefault();
    };

    const generateCode = async () => {
        if (!uri.trim()) {
            toast.error('Please enter a URI before generating a code.');
            return;
        }

        if (!isValidUri(uri.trim())) {
            toast.error('Invalid URI. Please enter a valid URI (e.g., https://)');
            return;
        }

        if (usePin && pinDigits.some(d => d === '')) {
            toast.error('PIN-code must be exactly 4 digits.');
            return;
        }

        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCode(generatedCode);
        setIsCode(true);

        try {
            const res = await fetch('http://localhost:5000/api/uri', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: generatedCode,
                    uri,
                    pin: usePin ? pinDigits.join('') : null
                }),
            });
            if (!res.ok) throw new Error('Failed to store URI');
            toast.success('Code generated and stored!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied to clipboard!');
    };

    const handleButtonClick = () => {
        if (isCode) {
            copyCodeToClipboard();
        } else {
            generateCode();
        }
    };

    const handleReset = () => {
        setCode('');
        setUri('');
        setPinDigits(Array(4).fill(''));
        setUsePin(false);
        setIsCode(false);
        toast.success('Code reset!');
    };

    return (
        <div className="uriLogicSection">
            <h3 className="uriLogicSection_title">Share your URI</h3>

            <TextField
                label="Enter a URI to share..."
                variant="outlined"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                fullWidth
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#aaa' },
                        '&:hover fieldset': { borderColor: '#888' },
                        '&.Mui-focused fieldset': { borderColor: '#673ab7' },
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '16px',
                        fontFamily: 'MuseoModerno',
                    },
                }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={usePin}
                        onChange={(e) => setUsePin(e.target.checked)}
                        color="primary"
                    />
                }
                label="Protect with PIN-code"
            />

            {usePin && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    {[...Array(4)].map((_, index) => (
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
            )}

            {isCode && (
                <div style={{ fontWeight: '600', fontSize: '16px', color: '#333' }}>
                    Your generated code: <span style={{ color: '#3255D5' }}>{code}</span>
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    fullWidth
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
                    onClick={handleButtonClick}
                >
                    {isCode ? 'COPY CODE' : 'GET A CODE'}
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

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
