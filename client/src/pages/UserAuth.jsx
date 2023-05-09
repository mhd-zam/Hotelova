import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function UserAuth() {
    let logged = useSelector((state) => state.user.isLoggedin)
    return logged ? <Outlet /> : <Navigate to="/" />
}

export default UserAuth
