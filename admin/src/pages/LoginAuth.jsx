import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Globalcontext } from '../context/Externalcontext'

function LoginAuth() {
    let {adminLogged}=useContext(Globalcontext)
  return (
   adminLogged?<Navigate to='/Dashboard'/>:<Outlet/>
  )
}

export default LoginAuth