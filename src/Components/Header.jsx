import React from 'react';
import {Container, Logo, Logoutbtn} from './index'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name : 'Home',
      slug : '/',
      active : true
    },
    {
      name : 'Log In',
      slug : '/login',
      active : !authStatus
    },
    {
      name : 'Sign Up',
      slug : '/signup',
      active : !authStatus
    },
    {
      name : 'All Posts',
      slug : '/all-posts',
      active : authStatus
    },
    {
      name : 'Add Post',
      slug : '/add-post',
      active : authStatus
    },
  ]

  return(
    <header className='py-3 shadow bg-gray-500 sticky top-0 z-10'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width='70px'/>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <div onClick={() => navigate(item.slug)} className='inline-block md:px-6 py-2 px-2 duration-200 md:mx-2 mx-1 text-gray-700 md:font-bold font-[600] md:text-lg text-[13px] hover:bg-black cursor-pointer rounded-full'>{item.name}</div>
              </li>
            ) : null 
            )}
          </ul>
        </nav>
        
        {authStatus && (
                <Logoutbtn/>
              //{authStatus && ((HTML)div or li or button etc...)} It is a basic react syntax in which HTML inside () brackets will be displayed only if authStatus will be true.
            )}
      </Container>
    </header>
  )
}

export default Header;