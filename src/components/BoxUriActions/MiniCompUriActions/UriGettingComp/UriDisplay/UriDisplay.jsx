import React from 'react';

export default function UriDisplay({ uri }) {
    return (
        <div style={{ paddingTop: '15px', fontWeight: '600', fontSize: '16px', color: '#333' }}>
            Your URI:{" "}
            <a 
                href={uri} 
                style={{
                    color: '#3255D5',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block',
                    maxWidth: '400px', 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'bottom',
                }}
                target="_blank" 
                rel="noopener noreferrer"
                title={uri} 
            >
                {uri}
            </a>
        </div>
    );
}
