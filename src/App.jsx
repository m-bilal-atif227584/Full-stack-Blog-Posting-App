import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './Components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [Loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return Loading ? null : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className="w-full block">
        <Header/>
        <main>
         <Outlet/> 
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default App
