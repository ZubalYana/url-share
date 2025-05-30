import React from 'react'
import './UriActions.css'
import UriSharing from '../uriSharing/uriSharing'
import UriGetting from '../UriGetting/UriGetting'
export default function UriActions() {
    return (
        <div className='uriActions'>
            <UriSharing />
            <UriGetting />
        </div>
    )
}
