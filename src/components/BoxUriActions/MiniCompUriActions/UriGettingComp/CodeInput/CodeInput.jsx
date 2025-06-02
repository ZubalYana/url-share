import React from 'react';
import { TextField } from '@mui/material';

export default function CodeInput({ inputsRef, handleChange, handleKeyDown, handlePaste }) {
    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            {[...Array(6)].map((_, index) => (
                <TextField
                    key={index}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    inputProps={{
                        maxLength: 1,
                        style: {
                            textAlign: 'center',
                            fontSize: { xs: '14px', sm: '24px' },
                            width: { xs: '35px', sm: '40px' },
                            height: { xs: '35px', sm: '56px' },
                            maxHeight: { xs: '35px', sm: '56px' },
                            fontFamily: 'fredoka',
                        },
                    }}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    variant="outlined"
                    placeholder="X"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            '& fieldset': { borderColor: '#aaa' },
                            '&:hover fieldset': { borderColor: '#888' },
                            '&.Mui-focused fieldset': { borderColor: '#673ab7' },
                        },
                        '& input::placeholder': { color: '#1E1E1E', opacity: 1 },
                    }}
                />
            ))}
        </div>
    );
}
