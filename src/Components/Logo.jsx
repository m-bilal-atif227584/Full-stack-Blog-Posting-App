import React from 'react';

function Logo() {
  return (
    <div className='rounded-2xl w-24 md:w-36'>
      <p className='text-[#6a6a6a] absolute md:mt-[73px] font-extrabold text-[14px] md:text-xl md:ml-4 ml-2 mt-[50px]'>Post Cloud</p>
    <img src="src/assets/logo.jpeg" alt="logo" className='rounded-2xl border-[3px] border-white' />
    </div>
  )
}

export default Logo