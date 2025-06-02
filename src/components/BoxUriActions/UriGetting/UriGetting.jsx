import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodeInput from '../MiniCompUriActions/UriGettingComp/CodeInput/CodeInput';
import UriDisplay from '../MiniCompUriActions/UriGettingComp/UriDisplay/UriDisplay';
import ActionButtons from '../MiniCompUriActions/UriGettingComp/ActionButtons/ActionButtons';
import PinUnlock from '../MiniCompUriActions/UriGettingComp/PinUnlock/PinUnlock';

const UriGetting = () => {
    const inputsRef = useRef([]);
    const [uri, setUri] = useState('');
    const [isUri, setIsUri] = useState(false);
    const [prevValues, setPrevValues] = useState(['', '', '', '', '', '']);
    const [pin, setPin] = useState('');
    const [code, setCode] = useState('');

    const [pinRequired, setPinRequired] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [currentCode, setCurrentCode] = useState('');


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
                    const res = await fetch(`/api/uri/${code}`);
                    if (res.status === 401) {

                        setCurrentCode(code);
                        setPinRequired(true);
                        toast.info('PIN is required for this code.');
                        return;
                    }
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


    const handlePinSubmit = async () => {
        try {
            const res = await fetch(`/api/uri/${currentCode}/unlock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: pinInput })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }

            const data = await res.json();
            setUri(data.uri);
            setIsUri(true);
            setPinRequired(false);
            toast.success('PIN accepted. URI unlocked!');
        } catch (err) {
            toast.error(err.message);
        }
    };


    const handleReset = () => {
        inputsRef.current.forEach(input => input && (input.value = ''));
        setUri('');
        setIsUri(false);
        setPin('');
        setCode('');
        setPinInput('');
        setPinRequired(false);
        setCurrentCode('');
        setPrevValues(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
        toast.success('URI reset!');
    };


    return (
        <div className="w-[500px] h-[225px] flex flex-col items-center">
            <h3 className="uppercase text-2xl font-semibold mb-2">Get a URI</h3>
            <CodeInput
                inputsRef={inputsRef}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                handlePaste={handlePaste}
            />

            {isUri && <UriDisplay uri={uri} />}

            {pinRequired && (
                <PinUnlock
                    pinInput={pinInput}
                    setPinInput={setPinInput}
                    handlePinSubmit={handlePinSubmit}
                />
            )}

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

export default UriGetting;
