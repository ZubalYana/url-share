import React from 'react';
import { TextField } from '@mui/material';

export default function UriInput({ uri, setUri }) {
    return (
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
    );
}
