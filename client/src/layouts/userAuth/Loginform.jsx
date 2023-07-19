import React, { useState, useContext, useEffect } from 'react'
import { ExternalContext } from '../../context/CustomContext'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { Stack } from '@mui/system'
import { ThemeProvider } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { GoogleLogin } from '@react-oauth/google'
import { onSigninssubmit, recaptcha } from '../../config/firebaseOtpConfig'
import Flag from '../../data'
import { theme0 } from '../../Themeprovider'
import { checkblocked, sendGmaildata } from '../../api/api'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import InputTextField from '../../component/BasicTextFields'
import { useDispatch } from 'react-redux'
import { setCheckUser, setUserDetails } from '../../Redux/user/userAction'
import Select from '@mui/material/Select'

function Form() {
    const {
        setIsfilled,
        userDetails,
        setuserDetails,
        setOpen,
        setAlert,
        setOpenlogin,
        setShowErr,
    } = useContext(ExternalContext)
    const dispatch = useDispatch()

    const [error, seterror] = useState({
        error: false,
        helperText: '',
    })

    const [headerror, setheaderror] = useState(false)
    // const matches = useMediaQuery('(min-width:600px)')

    useEffect(() => {
        recaptcha()
    }, [])

    function handlegooglelogin(data) {
        sendGmaildata(data)
            .then(({ data }) => {
                const { _id, phonenumber, email, username, accessToken } = data
                if (phonenumber.length != 13 || email.length < 5) {
                    dispatch(setCheckUser(true))
                }
                let obj = {
                    userDetails: {
                        _id,
                        phonenumber,
                        email,
                        username,
                        token: accessToken,
                    },
                }
                dispatch(setUserDetails(obj))
                setOpenlogin(false)
                setAlert({
                    notify: true,
                    message: 'logged in successfully',
                    action: 'success',
                })
                setOpen(false)
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    setheaderror(true)
                } else {
                    setShowErr(true)
                    setOpen(false)
                }
            })
    }

    function handlesubmit() {
        /* eslint-disable no-useless-escape */
        if (
            !userDetails.phonenumber.match(/^[0-9]*$/) ||
            userDetails.phonenumber.length != 10
        ) {
            seterror({
                error: true,
                helperText: 'phonenumber is invalid',
            })
        } else {
            checkblocked({
                phonenumber: userDetails.countrycode + userDetails.phonenumber,
            })
                .then(() => {
                    onSigninssubmit(
                        userDetails.countrycode,
                        userDetails.phonenumber
                    )
                        .then(() => {
                            setIsfilled(true)
                        })
                        .catch(() => {
                            seterror({
                                error: true,
                                helperText: 'phonenumber is invalid',
                            })
                        })
                })
                .catch(() => {
                    setheaderror(true)
                })
        }
    }

    const handlephonenumber = (e) => {
        seterror({
            error: false,
            helperText: '',
        })
        setuserDetails({ ...userDetails, phonenumber: e.target.value })
    }

    const handleCountrycode = (e) => {
        setuserDetails({ ...userDetails, countrycode: e.target.value })
    }
    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 4

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '100%' },
            }}
            autoComplete="off"
        >
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
            >
                <Typography variant="body1" color="red">
                    {headerror ? 'Blocked' : ''}
                </Typography>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={userDetails.countrycode}
                    helperText="Please select your country"
                    onChange={handleCountrycode}
                    MenuProps={MenuProps}
                    fullWidth
                >
                    {[
                        Flag.map((option) => (
                            <MenuItem
                                key={option.dial_code}
                                value={option.dial_code}
                            >
                                <Stack direction={'row'} spacing={2}>
                                 <span style={{marginRight:'1px'}} className={`fi fi-${option.code.toLowerCase()} fis`}></span>
                                    <span>{option.name + ' ' + option.dial_code}</span>
                                </Stack>
                            </MenuItem>
                        )),
                    ]}
                </Select>

                <InputTextField
                    error={error}
                    id="outlined-error-helper-text"
                    placeholder="phonenumber"
                    callback={handlephonenumber}
                    state={userDetails.phonenumber}
                />
            </Stack>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
            >
                <div id="recaptcha-container"></div>
                <ThemeProvider theme={theme0}>
                    <Button
                        id="sign-in-button"
                        onClick={handlesubmit}
                        variant="contained"
                    >
                        continue
                    </Button>
                </ThemeProvider>
                <Divider>or</Divider>

                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        handlegooglelogin(credentialResponse.credential)
                    }}
                    onError={() => {
                        alert('Login Failed')
                    }}
                />
            </Stack>
        </Box>
    )
}

export default Form
