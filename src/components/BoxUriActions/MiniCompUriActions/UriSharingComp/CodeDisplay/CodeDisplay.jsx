import React from 'react';

export default function CodeDisplay({ code }) {
    return (
        <div style={{ fontWeight: '600', fontSize: '16px', color: '#333' }}>
            Your generated code: <span style={{ color: '#3255D5' }}>{code}</span>
        </div>
    );
}
