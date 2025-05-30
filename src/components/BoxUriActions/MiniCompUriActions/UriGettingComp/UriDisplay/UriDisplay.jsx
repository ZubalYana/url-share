import React from 'react';

export default function UriDisplay({ uri }) {
    return (
        <div style={{ paddingTop: '15px', fontWeight: '600', fontSize: '16px', color: '#333' }}>
            Your URI: <span style={{ color: '#3255D5' }}>{uri}</span>
        </div>
    );
}
