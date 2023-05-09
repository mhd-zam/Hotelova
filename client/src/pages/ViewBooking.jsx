import React, { useContext } from 'react'
import BookingPage from '../layouts/BookingPage'
import { ExternalContext } from '../context/CustomContext'
import Somethingwentwrong from './Somethingwentwrong'

function ViewBooking() {
    const { ShowErr } = useContext(ExternalContext)

    return ShowErr ? <Somethingwentwrong /> : <BookingPage />
}

export default ViewBooking
