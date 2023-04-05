import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Globalcontext } from '../context/Externalcontext'

function Adminauth() {
    let {adminLogged}=useContext(Globalcontext)
  return (
   adminLogged?<Outlet/>:<Navigate to='/login'/>
  )
}

export default Adminauth