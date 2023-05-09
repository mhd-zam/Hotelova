import { Box, Stack, Typography } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import BtnComponent from '../../component/BtnComponent'
import { ExternalContext } from '../../context/CustomContext'
import { sendOtopData } from '../../api/api'
import { recaptcha, onSigninssubmit } from '../../config/firebaseOtpConfig'
import InputTextField from '../../component/BasicTextFields'
import { useDispatch } from 'react-redux'
import { setCheckUser, setUserDetails } from '../../Redux/user/userAction'
const Otpform = () => {
    const [otp, setOtp] = React.useState('')
    const [counter, setCounter] = useState(60)
    const { setOpen, setAlert, setOpenlogin, userDetails, setIsfilled } =
        useContext(ExternalContext)
    const dispatch = useDispatch()
    const [error, seterror] = useState({ error: false, helperText: '' })
    const handleChange = (e) => {
        setOtp(e.target.value)
    }

    function resendotp() {
        recaptcha()
        onSigninssubmit(userDetails.countrycode, userDetails.phonenumber)
            .then(() => {
                setCounter(60)
            })
            .catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        let timer =
            counter > 0 &&
            setInterval(() => {
                setCounter(counter - 1)
            }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [counter])

    const code = otp
    function verifyotp() {
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                const user = { accessToken: result.user.accessToken }
                sendOtopData(user)
                    .then((response) => {
                        console.log(response)
                        const { _id, phonenumber, email, username,accessToken} =
                            response.data
                        if (phonenumber.length != 13 || email.length < 5) {
                            dispatch(setCheckUser(true))
                        }
                        let obj = {userDetails: { _id, phonenumber, email, username,token:accessToken}}
                        dispatch(setUserDetails(obj))
                        setOpenlogin(false)
                        setAlert({
                            notify: true,
                            message: 'logged in successfully',
                            action: 'success',
                        })
                        setOpen(false)
                        setIsfilled(false)
                    })
                    .catch(() => {
                        setAlert({
                            notify: true,
                            message: 'please try again',
                            action: 'error',
                        })
                    })
            })
            .catch(() => {
                seterror({ error: true, helperText: 'otp invalid' })
            })
    }

    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 2, width: '100%' },
            }}
        >
            <Typography textAlign={'left'} variant="body2">{`otp send to ${
                userDetails.countrycode + userDetails.phonenumber
            }`}</Typography>

            <Stack
                direction={'column'}
                alignItems="center"
                justifyContent="center"
            >
                <InputTextField
                    error={error}
                    id="outlined-error-helper-text"
                    placeholder="otp"
                    defaultvalue=""
                    callback={handleChange}
                />
                {counter > 0 ? (
                    <BtnComponent
                        variant={'contained'}
                        callback={verifyotp}
                        content={'Verify'}
                    />
                ) : (
                    <BtnComponent
                        variant={'contained'}
                        callback={resendotp}
                        content={'resend otp'}
                    />
                )}

                {counter > 0 ? (
                    <Typography variant="body1">
                        Time remaining:00.{counter}
                    </Typography>
                ) : (
                    ''
                )}
                <div id="recaptcha-container" style={{ display: 'none' }}></div>
            </Stack>
        </Box>
    )
}

export default Otpform
