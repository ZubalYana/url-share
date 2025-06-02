import React from 'react';
import { Button } from '@mui/material';

export default function ActionButtons({ isUri, handleButtonClick, handleReset }) {
    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <Button
                onClick={handleButtonClick}
                variant="contained"
                sx={{
                    backgroundColor: '#3255D5',
                    color: '#fff',
                    borderRadius: '10px',
                    width: { xs: '150px', sm: '180px' },
                    height: { xs: '45px', sm: '55px' },
                    fontSize: { xs: '14px', sm: '16px' },
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    '&:hover': { backgroundColor: '#2C48AA' },
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
                    height: { xs: '45px', sm: '55px' },
                    fontSize: { xs: '14px', sm: '16px' },
                    fontWeight: '600',
                    textTransform: 'uppercase',
                }}
            >
                RESET
            </Button>
        </div>
    );
}
