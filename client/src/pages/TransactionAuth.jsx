import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function TransactionAuth() {
    let checkoutAuth = useSelector((state) => state.userCheckout)
    return checkoutAuth ? <Outlet /> : <Navigate to="/" />
}

export default TransactionAuth
