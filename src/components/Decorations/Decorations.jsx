import React from 'react'
import './Decorations.css'

export default function Decorations() {
  return (
    <>
      <div>
        <img className='absolute top-[-85px] left-[17px] h-[309px] z-10 spin-slow1' src="/DecorationsLeft1.svg" alt="gear1" />
        <img className='absolute top-[188px] left-[-58px] h-[212px] z-10 spin-medium1' src="/DecorationsLeft2.svg" alt="gear2" />
        <img className='absolute bottom-[176px] right-[-104px] spin-slow2' src="/DecorationsRight1.svg" alt="gear1" />
        <img className='absolute bottom-[-65px] right-[-50px] spin-medium2' src="/DecorationsRight2.svg" alt="gear2" />
      </div>
    </>
  )
}
