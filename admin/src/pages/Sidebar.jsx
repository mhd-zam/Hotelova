import React from 'react'
import MiniDrawer from '../component/MiniDrawer'
import { useLocation } from 'react-router-dom'

const Withoutsidebar = [
  "/Dashboard",
  "/Users",
  "/Hosting-Request",
  "/Bookings",
  "/Property-Management",
  '/Property-Category',
  '/Property-Facility'
];
function Sidebar({children}) {
    let { pathname } = useLocation()
    
    if(Withoutsidebar.some((item)=>pathname.includes(item))) return  <MiniDrawer>{ children}</MiniDrawer>

  return null
}

export default Sidebar