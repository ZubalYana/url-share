import React from 'react'
import UriSharing from '../uriSharing/uriSharing'
import UriGetting from '../UriGetting/UriGetting'
export default function UriActions() {
    return (
        <div className='uriActions w-full h-fit flex flex-col justify-center items-center gap-[20px] md:flex-row md:gap-[120px]'>
            <UriSharing />
            <UriGetting />
        </div>
    )
}
