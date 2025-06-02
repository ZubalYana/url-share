import React from 'react'

export default function Header() {
  return (

    <div className='flex justify-between pt-[50px] w-full '>

      <div className='w-[25%]'></div>




      <div className='w-[50%]'>
        <h1 className='text-[38px] font-semibold text-center'>URI-SHARE</h1>
        <p className='text-center text-[18px] font-regular'>A simple <span className='text-[#1E47DA] cursor-pointer'> solution </span>  to a common problem — <span className='text-[#1E47DA] cursor-pointer'>easily</span> share URLs <br /> and links across devices instantly.</p>
      </div>

      <div className='w-[25%] flex justify-center gap-[10px]'>


        <img className='cursor-pointer w-[30px] h-[30px]' src="/avatar.svg" alt="avatar.svg" />
        <p className='font-regular text-[#1E1E1E] text-[18px]'>Guest mode</p>
      </div>


    </div>
  )
}
