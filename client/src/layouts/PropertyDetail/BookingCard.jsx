import React, { useEffect } from 'react'
import { Box, Typography, Button, Card, Stack } from '@mui/material'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ChatIcon from '@mui/icons-material/Chat'
import { addconverstaion, checkRoomAvailability, checkout } from '../../api/api'
import dayjs from 'dayjs'
import { format } from 'date-fns'
import { ExternalContext } from '../../context/CustomContext'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TransactionOpen } from '../../Redux/Checkout/CheckoutAction'

const QuantityButton = ({ callback, children }) => (
    <Box
        component={'span'}
        onClick={callback}
        sx={{
            width: 30,
            height: 30,
            boxShadow: 4,
            textAlign: 'center',
            borderRadius: 2,
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
                bgcolor: '#955251',
                color: 'white',
            },
        }}
    >
        {children}
    </Box>
)

export default function BookingCard({ SingleProperty }) {
    const [startDate, setStartDate] = React.useState(dayjs())
    const [endDate, setEndDate] = React.useState(dayjs().add(1, 'day'))
    const { setAlert } = React.useContext(ExternalContext)
    const [totalGuest, setTotalGuest] = React.useState(1)
    const [adult, setAdult] = React.useState(1)
    const [children, setChildren] = React.useState(0)
    const [days, setDays] = React.useState(1)
    const [totalAmount, setTotalAmount] = React.useState(SingleProperty.Price)
    const [allowedGuest, setAllowed] = React.useState(SingleProperty.Maxguest)
    const isLoggedin = useSelector((state) => state.user.isLoggedin)
    const { setOpenlogin } = React.useContext(ExternalContext)
    const [Room, setRoom] = React.useState(1)
    const bookedRoom = React.useRef
    const RoomCount = React.useRef()
    const dispatch = useDispatch()
    const [guestTotalAmount, setGuestTotalAmount] = React.useState(
        SingleProperty.Price
    )
    let arr = Array.apply(null, {
        length: SingleProperty.Facility.Bedrooms + 1,
    }).map(Number.call, Number)
    arr.shift()

    let id = useSelector((state) => state.user.userDetails?._id)
    const navigate = useNavigate()

    async function checkdateAvaiable(startDate, endDate, id) {
        try {
            const { data } = await checkRoomAvailability({
                startDate,
                endDate,
                id,
            })
            RoomCount.current = data.length
            if (data.length >= Room) {
                let RoomAvailable = data.map((item) => item._id).slice(0, Room)
                bookedRoom.current = RoomAvailable
                return true
            }
            return false
        } catch (err) {
            alert(err)
        }
    }

    function handleLogin() {
        setOpenlogin(true)
    }

    function handledate(date) {
        const formattedDate = format(date.$d, 'yyyy-MM-dd')
        return formattedDate
    }

    function handleChatWithHost() {
        let data = {
            
            senderid: id,
            receiverid:SingleProperty.hostid,
        }
        addconverstaion(data)
            .then(() => {
                navigate('/ViewChat')
            })
            .catch((err) => {
                alert(err)
            })
    }

    function handlecheckout(value) {
        const startDateStartOfDay = startDate.startOf('day')
        const valueStartOfDay = dayjs(value).startOf('day')
        if (startDateStartOfDay.isSame(valueStartOfDay)) {
            setEndDate(dayjs(value).add(1, 'day'))
        } else {
            setEndDate(dayjs(value))
        }

        let diff = dayjs(value).diff(startDate, 'day')
        let nights = diff > 0 ? diff : 1
        let TotalAmt = SingleProperty.Price * nights
        setTotalAmount(TotalAmt)
        setDays(diff)
    }

    useEffect(() => {
        const TotalAmt = totalAmount * Room
        setGuestTotalAmount(TotalAmt)
    }, [totalAmount, Room])

    function handlecheckin(value) {
        setStartDate(dayjs(value))
        if (dayjs(value).isAfter(endDate)) {
        setEndDate(dayjs(value).add(1, 'day'))
        }
        let diff = endDate.diff(value, 'day')
        let nights = diff > 0 ? diff : 1
        let TotalAmt = SingleProperty.Price * nights
        setTotalAmount(TotalAmt)
        setDays(nights)
    }

    async function handleReserve() {
        const checkin = handledate(startDate)
        const checkOut = handledate(endDate)
        const checkAvalability = await checkdateAvaiable(
            checkin.slice(2),
            checkOut.slice(2),
            SingleProperty._id
        )

        if (totalGuest / Room < 1) {
            alert('Guest is required')
            return
        }

        if (checkAvalability) {
            dispatch(TransactionOpen())
            checkout(
                SingleProperty,
                checkin,
                checkOut,
                id,
                adult,
                children,
                Room,
                bookedRoom.current,
                guestTotalAmount
            )
                .then((response) => {
                    window.location.href = response.data.url
                })
                .catch((err) => {
                    alert(err)
                })
        } else {
            setAlert({
                notify: true,
                message: `${
                    RoomCount.current === 0 ? 'No' : RoomCount.current
                } room available`,
                action: 'error',
            })
        }
    }

    const handleChange = (e) => {
        setAllowed(SingleProperty.Maxguest * e.target.value)
        setAdult(SingleProperty.Maxguest * e.target.value)
        setTotalGuest(SingleProperty.Maxguest * e.target.value)
        setChildren(0)
        setRoom(e.target.value)
    }

    return (
        <Card
            sx={{
                width: 300,
                height: 'auto',
                p: 2,
                borderStyle: 'solid',
                borderWidth: '.2px',
                borderColor: '#dddddd',
                boxShadow: 2,
            }}
        >
            <Stack direction={'column'} spacing={2}>
                <Typography variant="h5">
                    ₹ {SingleProperty.Price} night
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DemoItem label="check-in">
                            <DatePicker
                                onChange={handlecheckin}
                                value={startDate}
                                disablePast
                                defaultValue={startDate}
                            />
                        </DemoItem>
                        <DemoItem label="check-out">
                            <DatePicker
                                onChange={handlecheckout}
                                value={endDate}
                                disablePast
                                minDate={startDate}
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                <Box display={'flex'} flexDirection="row" m={2}>
                    <Typography flexGrow={1} variant="body1">
                        Rooms
                        <Typography variant="caption">
                            {' '}
                            ({SingleProperty.Maxguest} Guest per Room )
                        </Typography>
                    </Typography>
                    <FormControl sx={{ m: 1 }}>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            size="small"
                            value={Room}
                            onChange={handleChange}
                            autoWidth
                            sx={{ height: 25, width: 60 }}
                        >
                            {arr.map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box display={'flex'} flexDirection="row" m={2}>
                    <Typography flexGrow={1} variant="body1">
                        Adult
                    </Typography>

                    <Stack direction={'row'} spacing={1}>
                        <QuantityButton
                            callback={() => {
                                if (adult > 1) {
                                    setAdult(adult - 1)
                                    setTotalGuest(totalGuest - 1)
                                }
                            }}
                        >
                            -
                        </QuantityButton>
                        <label>{adult}</label>
                        <QuantityButton
                            callback={() => {
                                if (totalGuest < allowedGuest) {
                                    setAdult(adult + 1)
                                    setTotalGuest(totalGuest + 1)
                                } else {
                                    alert(
                                        `only ${SingleProperty.Maxguest} allowed per room `
                                    )
                                }
                            }}
                        >
                            +
                        </QuantityButton>
                    </Stack>
                </Box>
                <Box display={'flex'} flexDirection="row" m={2}>
                    <Typography flexGrow={1} variant="body1">
                        Children{' '}
                        <Typography variant="caption">
                            {' '}
                            (Age above 10)
                        </Typography>
                    </Typography>
                    <Stack direction={'row'} spacing={1}>
                        <QuantityButton
                            callback={() => {
                                if (children > 0) {
                                    setChildren(children - 1)
                                    setTotalGuest(totalGuest - 1)
                                }
                            }}
                        >
                            -
                        </QuantityButton>
                        <label>{children}</label>
                        <QuantityButton
                            callback={() => {
                                if (totalGuest < allowedGuest) {
                                    setChildren(children + 1)
                                    setTotalGuest(totalGuest + 1)
                                } else {
                                    alert(`only ${allowedGuest} allowed `)
                                }
                            }}
                        >
                            +
                        </QuantityButton>
                    </Stack>
                </Box>

                <Stack direction={'column'} spacing={2}>
                    {isLoggedin ? (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleReserve()
                                }}
                            >
                                Reserve
                            </Button>
                            <Button
                                startIcon={<ChatIcon />}
                                variant="contained"
                                onClick={handleChatWithHost}
                            >
                                Chat with host
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Stack>
                <Box display={'flex'} flexDirection={'row'}>
                    <Typography flexGrow={1}>
                        ₹ {SingleProperty.Price} x {days} nights
                    </Typography>
                    <Typography>₹{totalAmount}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'}>
                    <Typography flexGrow={1} variant="h6" fontWeight={600}>
                        Total
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                        ₹{guestTotalAmount}
                    </Typography>
                </Box>
            </Stack>
        </Card>
    )
}
