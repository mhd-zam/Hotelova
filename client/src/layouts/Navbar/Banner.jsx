import React, { useRef, useState } from 'react'
import { Box, Button, Paper, Autocomplete, Stack } from '@mui/material/'
import TextField from '@mui/material/TextField'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import {
    addCheckin,
    addCheckout,
    addDestination,
} from '../../Redux/search/searchAction'
import useMediaQuery from '@mui/material/useMediaQuery'
// addDestination,
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn'
function Banner() {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = React.useState(dayjs())
    const [endDate, setEndDate] = React.useState(startDate.add(1, 'day'))
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const navigate = useNavigate()
    let debounceTimer = useRef()
    const matches = useMediaQuery('(min-width:900px)')
    function handledate(date) {
        const formattedDate = format(date.$d, 'yy-MM-dd')
        return formattedDate
    }

    async function handleDestination() {
        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=pk.eyJ1IjoibWhkemFtIiwiYSI6ImNsZnRuOWVlczAyaTIzc25yNm96a3ltenoifQ.MfJmNXS8SqvbICe301UesA&autocomplete=true`
            const response = await fetch(endpoint)
            const results = await response.json()
            setSuggestions(results?.features)
        } catch (error) {
            console.log('Error fetching data, ', error)
        }
    }

    function debounceHandleDestination(e) {
        if (e?.target) {
            setInputValue(e.target.value)
        }
        clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(() => handleDestination(), 1000)
    }

    function handlecheckin(value) {
        setStartDate(dayjs(value))
        setEndDate(dayjs(value).add(1, 'day'))
    }

    function handlecheckout(value) {
        const startDateStartOfDay = startDate.startOf('day')
        const valueStartOfDay = dayjs(value).startOf('day')
        if (startDateStartOfDay.isSame(valueStartOfDay)) {
            setEndDate(dayjs(value).add(1, 'day'))
        } else {
            setEndDate(dayjs(value))
        }
    }

    function handlesubmit() {
        dispatch(addDestination(inputValue))
        let start = handledate(startDate)
        let end = handledate(endDate)
        dispatch(addCheckout(end))
        dispatch(addCheckin(start))
        navigate('/Search')
    }

    return (
        <Box
            sx={{
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                backgroundImage:
                    'url("https://hotelova.s3.ap-south-1.amazonaws.com/wp1846099.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Paper
                component={'div'}
                sx={{ p: 1, pt: 0, borderRadius: 5, maxWidth: 900 }}
            >
                <Stack direction={matches ? 'row' : 'column'} spacing={1}>
                    <Box mt={1}>
                        <Box sx={{ minWidth: '370px', width: '100%' }}>
                            <Autocomplete
                                id="free-solo-2-demo"
                                options={suggestions}
                                inputValue={inputValue}
                                onInputChange={debounceHandleDestination}
                                onChange={(event, newValue) => {
                                    event.preventDefault()
                                    setInputValue(newValue.place_name)
                                }}
                                getOptionLabel={(option) =>
                                    option.place_name ? option.place_name : ''
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Destination"
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <LocationOnIcon /> {option.place_name}
                                    </li>
                                )}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    onChange={handlecheckin}
                                    value={startDate}
                                    disablePast
                                    defaultValue={startDate}
                                    label={'Check-in'}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    onChange={handlecheckout}
                                    value={endDate}
                                    disablePast
                                    minDate={startDate}
                                    label={'Check-out'}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box pt={1}>
                        <Button
                            variant="contained"
                            sx={{
                                height: 50,
                                bgcolor: 'brown',
                                color: 'white',
                                width: '100%',
                                borderRadius: 50,
                            }}
                            onClick={handlesubmit}
                        >
                            <SearchTwoToneIcon />
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    )
}

export default Banner
