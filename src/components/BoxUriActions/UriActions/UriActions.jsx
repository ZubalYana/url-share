import React from 'react'
import UriSharing from '../uriSharing/uriSharing'
import UriGetting from '../UriGetting/UriGetting'
export default function UriActions() {
    return (
        <div className='uriActions w-full flex flex-col justify-center items-center gap-[120px] md:flex-row'>
            <UriSharing />
            <UriGetting />
        </div>
    )
}
