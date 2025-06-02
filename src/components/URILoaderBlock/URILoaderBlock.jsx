import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField } from '@mui/material';

function FlipCard({ digit }) {
  const [displayDigit, setDisplayDigit] = useState(digit);
  const [rotation, setRotation] = useState(0);
  const timeoutRef = useRef();



  useEffect(() => {
    if (digit !== displayDigit) {
      setRotation((r) => r + 360);
      timeoutRef.current = setTimeout(() => {
        setDisplayDigit(digit);
      }, 300);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [digit, displayDigit]);

  return (
    <Box
      sx={{
        perspective: 600,
        width: 48,
        height: 56,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          border: '1.5px solid #aaa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '24px',
          userSelect: 'none',
          cursor: 'default',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center',
          transition: 'transform 600ms ease-in-out',
          transform: `rotateX(${rotation}deg)`,
        }}
      >
        <TextField
          value={displayDigit}
          inputProps={{
            maxLength: 1,
            readOnly: true,
            style: {
              textAlign: 'center',
              fontSize: '24px',
              width: '40px',
              height: '40px',
              fontFamily: 'Fredoka, sans-serif',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              userSelect: 'none',
              cursor: 'default',
            },
          }}
          variant="standard"
          sx={{
            '& .MuiInputBase-input': {
              padding: 0,
              textAlign: 'center',
              width: '40px',
              height: '40px',
              fontSize: '24px',
              fontFamily: 'Fredoka, sans-serif',
            },
            '& .MuiInput-underline:before, & .MuiInput-underline:after': {
              borderBottom: 'none',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default function FlipCounter() {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const res = await fetch('/api/downloads/count');
      const data = await res.json();
      setCount(data.count || 0);
    } catch (error) {
      console.error('Failed to fetch count:', error);
    }
  };

  useEffect(() => {
    fetchCount();

    const interval = setInterval(() => {
      fetchCount();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const digits = String(count).padStart(4, '0').split('');

  return (
    <div className='flex flex-col items-center mt-10'>
      <h2 className='text-[24px] font-semibold text-center mb-1 uppercase'>URI loaded</h2>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        {digits.map((digit, index) => (
          <FlipCard key={index} digit={digit} />
        ))}
      </Box>
    </div>
  );
}
