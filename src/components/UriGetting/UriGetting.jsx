import React, { useRef } from 'react';
import './UriGetting.css';
import { Button, TextField } from '@mui/material';

export default function UriGetting() {
    const inputsRef = useRef([]);

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
                        variant="outlined"
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
                        }}
                    />
                ))}
            </div>
            <Button
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: '#3255D5',
                    color: '#fff',
                    borderRadius: '10px',
                    marginTop: '20px',
                    width: '270px',
                    height: '55px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    '&:hover': {
                        backgroundColor: '#2C48AA',
                    },
                }}
            >
                Get a URI
            </Button>
        </div>
    );
}
