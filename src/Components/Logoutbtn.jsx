import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { logout } from '../store/authSlice';

function Logoutbtn() {
    
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }

  return <button onClick={logoutHandler} className='text-[0.8rem] md:text-[1.07rem] bg-black text-white rounded-md px-2 py-2 md:px-4 md:py-2 duration-200 hover:bg-gray-800 absolute right-6 top-[53px]'>Log out</button> 
}

export default Logoutbtn