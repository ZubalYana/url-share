import React from 'react'
import './UriSharing.css'
import { TextField, Button } from '@mui/material'

export default function UriSharing() {
    return (
        <div className='uriLogicSection'>
            <h3 className='uriLogicSection_title'>Share your URI</h3>
            <TextField
                label="Enter a URI to share..."
                variant="outlined"
                fullWidth
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
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
                    '& .MuiInputLabel-root': {
                        fontSize: '16px',
                        fontFamily: 'MuseoModerno',
                    },
                }}
            />
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
                Get a code
            </Button>
        </div>
    )
}
