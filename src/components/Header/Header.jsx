import React from 'react'

export default function Header() {
  return (

    <div className='flex justify-between pt-4 md:pt-[50px] w-full '>
      <div className='w-0 md:w-[25%]'></div>
      <div className='w-full p-4 md:w-[50%] md:p-0'>
        <h1 className='text-[24px] font-semibold text-center md:text-[38px]'>URI-SHARE</h1>
        <p className='text-center text-[12px] font-regular md:text-[18px]'>A simple <span className='text-[#1E47DA] cursor-pointer'> solution </span>  to a common problem — <span className='text-[#1E47DA] cursor-pointer'>easily</span> share URLs and links across devices instantly.</p>
      </div>
      <div className='w-0 hidden justify-center gap-[10px] md:w-[25%] md:flex'>
        <img className='cursor-pointer w-[30px] h-[30px]' src="/avatar.svg" alt="avatar.svg" />
        <p className='font-regular text-[#1E1E1E] text-[18px]'>Guest mode</p>
      </div>
      <img className='cursor-pointer w-[25px] h-[25px] absolute top-4 right-4 md:hidden' src="/avatar.svg" alt="avatar" />
    </div>
  )
}
