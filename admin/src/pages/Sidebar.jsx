import React from 'react'
import MiniDrawer from '../component/MiniDrawer'
import { useLocation } from 'react-router-dom'

const Withoutsidebar=['/login']
function Sidebar({children}) {
    let { pathname } = useLocation()
    
    if(Withoutsidebar.some((item)=>pathname.includes(item))) return null

  return (
      <MiniDrawer>{ children}</MiniDrawer>
  )
}

export default Sidebar