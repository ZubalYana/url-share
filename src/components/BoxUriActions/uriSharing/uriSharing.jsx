import React, { useState, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UriInput from '../MiniCompUriActions/UriSharingComp/UriInput/UriInput';
import PinInput from '../MiniCompUriActions/UriSharingComp/PinInput/PinInput';
import CodeDisplay from '../MiniCompUriActions/UriSharingComp/CodeDisplay/CodeDisplay';
import ActionButtons from '../MiniCompUriActions/UriSharingComp/ActionButtons/ActionButtons';

export default function UriSharing() {
    const [isCode, setIsCode] = useState(false);
    const [code, setCode] = useState('');
    const [uri, setUri] = useState('');
    const [usePin, setUsePin] = useState(false);
    const [pinDigits, setPinDigits] = useState(Array(4).fill(''));
    const inputsRef = useRef([]);
    const token = localStorage.getItem('token');

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
        if (val && index < 3) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, 4);
        const newDigits = Array(4).fill('');
        for (let i = 0; i < pasted.length; i++) newDigits[i] = pasted[i];
        setPinDigits(newDigits);
        pasted.split('').forEach((char, i) => {
            if (inputsRef.current[i]) inputsRef.current[i].value = char;
        });
        inputsRef.current[pasted.length - 1]?.focus();
        e.preventDefault();
    };

   const generateCode = async () => {
    if (!uri.trim()) return toast.error('Please enter a URI before generating a code.');
    if (!isValidUri(uri.trim())) return toast.error('Invalid URI. Please enter a valid URI (e.g., https://)');
    if (usePin && pinDigits.some(d => d === '')) return toast.error('PIN-code must be exactly 4 digits.');

    try {
        const res = await fetch('/api/uri', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ uri, pin: usePin ? pinDigits.join('') : null }),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Failed to store URI');
        }

        const data = await res.json();
        setCode(data.code); 
        setIsCode(true);
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
        if (isCode) copyCodeToClipboard();
        else generateCode();
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
        <div className="w-[100%] flex flex-col items-center mt-8 p-4 md:w-[500px] md:h-[225px] md:mt-0 md:p-0">
            <h2 className='text-[18px] font-semibold text-center mb-1 uppercase md:text-[24px] text-[#1c1c1c]'>Share your URI</h2>

            <UriInput uri={uri} setUri={setUri} />

            {uri.trim() && (
                <FormControlLabel
                    control={<Checkbox checked={usePin} onChange={(e) => setUsePin(e.target.checked)} color="primary" />}
                    label="Protect with PIN-code"
                    className='mt-[20px]'
                />
            )}

            {usePin && (
                <PinInput
                    pinDigits={pinDigits}
                    setPinDigits={setPinDigits}
                    inputsRef={inputsRef}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    handlePaste={handlePaste}
                />
            )}

            {isCode && (!usePin || pinDigits.every(d => d !== '')) && <CodeDisplay code={code} />}

            <ActionButtons
                isCode={isCode}
                handleButtonClick={handleButtonClick}
                handleReset={handleReset}
            />

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );


}
