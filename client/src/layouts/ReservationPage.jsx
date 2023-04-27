import React, { useEffect, useState } from 'react'
import TableComponent from '../component/TableComponent'
import {
    ApproveReservation,
    RejectReservation,
    getReservation,
} from '../api/api'
import { useSelector } from 'react-redux'
import { Container } from '@mui/material'
import PermissionAlert from '../component/PermissionAlert'

function ReservationPage() {
    const userid = useSelector((state) => state.user.userDetails._id)
    const [refresh, setRefresh] = useState(false)
    const [open, setopen] = React.useState(false)
    const [id, setid] = React.useState(null)

    function approveBooking(id) {
        ApproveReservation(id)
            .then(() => {
                setRefresh(!refresh)
            })
            .catch((err) => {
                alert(err)
            })
    }

    function rejectBooking() {
        RejectReservation(id)
            .then(() => {
                setRefresh(!refresh)
                setopen(false)
            })
            .catch((err) => {
                alert(err)
            })
    }

    let header = [
        { field: 'GuestName', type: 1 },
        {
            field: 'GuestPhonenumber',
            type: 1,
        },
        { field: 'GuestEmail', type: 1 },
        {
            field: 'Checkin',
            type: 1,
        },
        {
            field: 'Checkout',
            type: 1,
        },
        {
            field: 'guest',
            type: 6,
        },
        {
            field: 'propertyName',
            type: 1,
        },
        {
            field: 'totalprice',
            type: 7,
        },
        {
            field: 'Action',
            type: 4,
            text1: 'Approve',
            color1: 'ApproveClr',
            textcolor1: 'white',
            callback1: approveBooking,
            text2: 'Reject',
            color2: 'error',
            textcolor2: 'white',
            callback2: alertPop,
        },
    ]

    function alertPop(ID) {
        setid(ID)
        setopen(true)
    }
    function CancelAction() {
        setopen(false)
    }

    const [Data, setData] = useState()

    useEffect(() => {
        getReservation(userid).then(({ data }) => {
            setData(data)
        })
    }, [refresh])

    return (
        <Container maxWidth="xl" sx={{ width: '94%' }}>
            <TableComponent
                heading={header}
                data={Data}
                title={'Reservation'}
            />
            <PermissionAlert
                open={open}
                content={'Do you want to cancel the reservation'}
                title={'Cancel Reservation'}
                Agreecallback={rejectBooking}
                Cancelcallback={CancelAction}
            />
        </Container>
    )
}

export default ReservationPage
