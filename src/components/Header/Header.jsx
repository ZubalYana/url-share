import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileModal from '../UserProfile/UserProfile';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (user && token) {
      setModalOpen(true);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className='flex justify-between pt-4 md:pt-7 lg:pt-[50px] w-full z-10 relative'>
      <div className='w-0 md:w-[25%]'></div>

      <div className='w-full p-4 md:w-[50%] md:p-0'>
        <h1 className='text-[24px] font-semibold text-center md:text-[32px] lg:text-[38px]'>URI-SHARE</h1>
        <p className='text-center text-[12px] font-regular md:text-[16px] lg:text-[18px]'>
          A simple <span className='text-[#1E47DA] cursor-pointer'>solution</span> to a common problem —
          <span className='text-[#1E47DA] cursor-pointer'> easily</span> share URLs and links across devices instantly.
        </p>
      </div>

      <div className='w-0 hidden justify-end pr-12 gap-[10px] md:w-[25%] md:flex'>
        <img
          onClick={handleAvatarClick}
          className='cursor-pointer w-[30px] h-[30px]'
          src='/avatar.svg'
          alt='avatar'
        />
        <p className='font-regular text-[#1E1E1E] text-[18px] cursor-pointer' onClick={handleAvatarClick}>
          {user?.name || 'Guest mode'}
        </p>
      </div>

      <img
        onClick={handleAvatarClick}
        className='cursor-pointer w-[25px] h-[25px] absolute top-4 right-4 md:hidden'
        src='/avatar.svg'
        alt='avatar'
      />

      {modalOpen && (
        <UserProfileModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
