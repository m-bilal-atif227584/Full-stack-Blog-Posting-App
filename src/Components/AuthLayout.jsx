import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loading, setloading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO : Make it more easy to understand.
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloading(false)
    },[authStatus,navigate,authentication])
  return loading ? <h1>Loading...</h1> : <>{children}</>
}