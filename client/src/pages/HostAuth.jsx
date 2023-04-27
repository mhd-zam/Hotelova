import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import React from 'react-dom'

function HostAuth() {
    let hosted = useSelector((state) => state.user.ishosted)
    return hosted ? <Outlet /> : <Navigate to="/" />
}

export default HostAuth
