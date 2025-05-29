import React, { useState } from 'react';
import './UriSharing.css';
import { TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UriSharing() {
    const [isCode, setIsCode] = useState(false);
    const [code, setCode] = useState('');
    const [uri, setUri] = useState('');

    const generateCode = () => {
        if (!uri.trim()) {
            toast.error('Please enter a URI before generating a code.');
            return;
        }

        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCode(generatedCode);
        setIsCode(true);
        toast.success('Code generated!');
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

            {isCode && (
                <div style={{ fontWeight: '600', fontSize: '16px', color: '#333' }}>
                    Your generated code: <span style={{ color: '#3255D5' }}>{code}</span>
                </div>
            )}

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
                onClick={handleButtonClick}
            >
                {isCode ? 'COPY CODE' : 'GET A CODE'}
            </Button>

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
