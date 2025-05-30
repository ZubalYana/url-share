import React from 'react';
import { Button } from '@mui/material';

export default function ActionButtons({ isCode, handleButtonClick, handleReset }) {
    return (
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
                    '&:hover': { backgroundColor: '#2C48AA' },
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
    );
}
