import React, { useState } from 'react'
import BasicTable from '../component/BasicTable'
import { allbooking, cancelBooking } from '../Api/RestApi';
import PermissionAlert from '../component/PermissionAlert';
import { Box } from '@mui/material';

function BookingPage() {
    const heading=[
        { field: "PropertyName", type: 1 },
        { field: "HostName", type: 1 },
        { field: "HostPhone", type: 1 },
        { field: "GuestName", type: 1 },
        { field: "GuestPhone", type: 1 },
        { field: "Checkin", type: 1 },
        { field: "Checkout", type: 1 },
        { field: "BookingStatus", type: 8 },
        { field: "NumberOfGuest", type: 6 },
        { field: "TotalAmount", type: 7 },
        { field: "Action", type: 9, text: 'cancel', color: 'red', textcolor: 'white',callback:alertPop}
    ];

    const [bookings, setBookings] = useState()
    const [open, setopen] = useState(false)
    const [id,setid]=useState(null)
    
    React.useEffect(() => {
        allbooking().then(({data}) => {
            setBookings(data)
        })
    },[])

    function alertPop(ID) {
        setid(ID)
        setopen(true)
    }
    function cancel() {
        setopen(false)
    }

    function CancelBooking() {
        setopen(false)
        cancelBooking(id).then(() => {
            let result = bookings.map((item) => {
                if (item._id === id) {
                    item.BookingStatus = 'Booking Cancelled'
                    item.Action=false
                }
                return item
            })
            setBookings(result)
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
      <Box>
      <BasicTable heading={heading} data={bookings} title={'Bookings'} />
      <PermissionAlert open={open} Agreecallback={CancelBooking} title={'Do you want to cancel the booking'} Cancelcallback={cancel}  />
      </Box>
  )
}

export default BookingPage