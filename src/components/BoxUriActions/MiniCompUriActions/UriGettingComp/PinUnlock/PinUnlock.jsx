import React from 'react';

export default function PinUnlock({ pinInput, setPinInput, handlePinSubmit }) {
    return (
        <div style={{ marginTop: '20px' }}>
            <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN"
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    marginRight: '10px',
                    width: '150px'
                }}
            />
            <button
                onClick={handlePinSubmit}
                style={{
                    padding: '10px 15px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#3255D5',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Unlock
            </button>
        </div>
    );
}
