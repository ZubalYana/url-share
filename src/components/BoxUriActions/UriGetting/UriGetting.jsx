import React, { useRef, useState } from 'react';
import './UriGetting.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodeInput from '../MiniCompUriActions/CodeInput/CodeInput';
import UriDisplay from '../MiniCompUriActions/UriDisplay/UriDisplay';
import ActionButtons from '../MiniCompUriActions/ActionButtons/ActionButtons';


export default function UriGetting() {
    const inputsRef = useRef([]);
    const [uri, setUri] = useState('');
    const [isUri, setIsUri] = useState(false);
    const [prevValues, setPrevValues] = useState(['', '', '', '', '', '']);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9a-zA-Z]?$/.test(value)) return;
        e.target.value = value.toUpperCase();
        if (value && index < 5) inputsRef.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputsRef.current[index - 1].focus();
        }
        if (e.ctrlKey && e.key === 'z') {
            prevValues.forEach((char, i) => {
                if (inputsRef.current[i]) inputsRef.current[i].value = char;
            });
            toast.info('Undo paste');
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('Text').toUpperCase().replace(/[^0-9A-Z]/g, '');
        if (paste.length === 6) {
            const currentValues = inputsRef.current.map(input => input.value);
            setPrevValues(currentValues);
            paste.split('').forEach((char, i) => {
                if (inputsRef.current[i]) inputsRef.current[i].value = char;
            });
            inputsRef.current[5]?.focus();
            toast.success('Code pasted');
        }
        e.preventDefault();
    };

    const handleButtonClick = async () => {
        if (!isUri) {
            const code = inputsRef.current.map(input => input.value).join('');
            if (code.length === 6) {
                try {
                    const res = await fetch(`http://localhost:5000/api/uri/${code}`);
                    if (!res.ok) throw new Error('Code not found');
                    const data = await res.json();
                    setUri(data.uri);
                    setIsUri(true);
                    toast.success('URI found!');
                } catch (err) {
                    toast.error(err.message);
                }
            } else {
                toast.error('Please enter 6 characters');
            }
        } else {
            try {
                await navigator.clipboard.writeText(uri);
                toast.success('URI copied to clipboard!');
            } catch {
                toast.error('Failed to copy URI!');
            }
        }
    };

    const handleReset = () => {
        inputsRef.current.forEach(input => input && (input.value = ''));
        setUri('');
        setIsUri(false);
        setPrevValues(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
        toast.success('URI reset!');
    };

    return (
        <div className="uriLogicSection">
            <h3 className="uriLogicSection_title">Get a URI</h3>
            <CodeInput
                inputsRef={inputsRef}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                handlePaste={handlePaste}
            />
            {isUri && <UriDisplay uri={uri} />}
            <ActionButtons
                isUri={isUri}
                handleButtonClick={handleButtonClick}
                handleReset={handleReset}
            />
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