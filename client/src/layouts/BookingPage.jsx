import React, { useContext } from 'react'
import { Container } from '@mui/material'

import TableComponent from '../component/TableComponent'
import { useEffect } from 'react'
import { Cancelorder, getUserOrders } from '../api/api'
import { useSelector } from 'react-redux'
import PermissionAlert from '../component/PermissionAlert'
import { ExternalContext } from '../context/CustomContext'

function BookingPage() {
    const [open, setopen] = React.useState(false)
    const [id, setid] = React.useState(null)
    const { setShowErr } = useContext(ExternalContext)
    const header = [
        { field: 'PropertyName', type: 1 },
        {
            field: 'PropertyAddress',
            type: 1,
        },
        { field: 'Image', type: 5 },
        {
            field: 'Checkin',
            type: 1,
        },
        {
            field: 'Checkout',
            type: 1,
        },
        {
            field: 'Guest',
            type: 6,
        },
        {
            field: 'OrderStatus',
            type: 8,
        },
        {
            field: 'TotalAmount',
            type: 7,
        },
        {
            field: 'Action',
            type: 3,
            text: 'Cancel Booking',
            color: 'error',
            textcolor: 'white',
            callback: alertPop,
        },
    ]

    function Cancel() {
        Cancelorder(id)
            .then(() => {
                let result = order.map((item) => {
                    if (item._id === id) {
                        item.OrderStatus = 'Booking Cancelled'
                        item.Action = false
                    }
                    return item
                })

                setOrder(result)
                setopen(false)
            })
            .catch(() => {
                setShowErr(true)
            })
    }

    const userid = useSelector((state) => state.user.userDetails._id)

    const [order, setOrder] = React.useState()

    function CancelAction() {
        setopen(false)
    }

    function alertPop(ID) {
        setid(ID)
        setopen(true)
    }

    useEffect(() => {
        getUserOrders(userid).then(({ data }) => {
            setOrder(data)
        })
    }, [])

    return (
        <Container maxWidth="xl" sx={{ width: '94%' }}>
            <TableComponent
                heading={header}
                data={order}
                title={'Bookings'}
                hideHeading={false}
            />
            <PermissionAlert
                open={open}
                content={'Do you want to cancel the booking'}
                title={'Cancel Booking'}
                Agreecallback={Cancel}
                Cancelcallback={CancelAction}
            />
        </Container>
    )
}

export default BookingPage
