import { Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { senduserdetails } from '../../api/api'
import BasicTextFields from '../../component/BasicTextFields'
import BtnComponent from '../../component/BtnComponent'
import { ExternalContext } from '../../context/CustomContext'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckUser } from '../../Redux/user/userAction'
function Enterusername() {
    const { setOpenlogin, setOpen } = useContext(ExternalContext)
    const userDetails = useSelector((state) => state.user.userDetails)
    const dispatch = useDispatch()
    const [details, Setdetails] = useState({})
    const [error, seterror] = useState({ error: false, helperText: '' })
    const [fillerror, setfillerror] = useState(false)
    useEffect(() => {
        Setdetails({ ...details, _id: userDetails._id })
    }, [])

    let name = userDetails.phonenumber.length == 13 ? 'email' : 'phonenumber'
    function handleformdata(e) {
        setfillerror(false)
        seterror({ error: false, helperText: '' })
        Setdetails({ ...details, [e.target.name]: e.target.value })
    }

    function handlesubmit() {
        console.log(details)
        if (details[name] == undefined) {
            setfillerror(true)
        } else if (
            name == 'phonenumber' &&
            (!details.phonenumber.match(/^[0-9]*$/) ||
                details.phonenumber.length != 10)
        ) {
            seterror({ error: true, helperText: 'invalid phonenumber' })
        } else if (
            name == 'email' &&
            !details.email
                .trim()
                .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ) {
            seterror({ error: true, helperText: 'invalid email' })
        } else {
            senduserdetails(details)
                .then(() => {
                    dispatch(setCheckUser(false))
                    setOpenlogin(false)
                    setOpen(false)
                })
                .catch(() => {
                    seterror({ error: true, helperText: 'already in use' })
                })
        }
    }

    return (
        <div>
            <Stack direction={'column'} spacing={2}>
                {fillerror && (
                    <Typography
                        variant="body1"
                        color={'red'}
                        textAlign="center"
                    >
                        please fill the form
                    </Typography>
                )}
                <BasicTextFields
                    placeholder={'username'}
                    state={details.username}
                    callback={handleformdata}
                />

                <BasicTextFields
                    placeholder={name}
                    error={error}
                    state={details[name]}
                    callback={handleformdata}
                />

                <BtnComponent
                    variant={'contained'}
                    content={'continue'}
                    callback={handlesubmit}
                />
            </Stack>
        </div>
    )
}

export default Enterusername
