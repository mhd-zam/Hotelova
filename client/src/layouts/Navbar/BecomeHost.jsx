import React, { useEffect, useContext } from 'react'
import { Box, Typography } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, sethost } from '../../Redux/user/userAction'
import { checkHostOrNot } from '../../api/api'
import { ExternalContext } from '../../context/CustomContext'

function BecomeHost() {
    const ishosted = useSelector((state) => state.user.ishosted)
    const { setOpenlogin } = useContext(ExternalContext)
    const Navigate = useNavigate()
    const isLoggedin = useSelector((state) => state.user.isLoggedin)
    const userDetails = useSelector((state) => state.user.userDetails)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLoggedin) {
            checkHostOrNot({ id: userDetails._id })
                .then(({ data }) => {
                    if (data.ishosted) {
                        dispatch(sethost())
                    }
                })
                .catch(() => {
                    dispatch(logout())
                })
        }
    }, [isLoggedin])

    const becomeAhost = () => {
        if (isLoggedin) {
            Navigate('/hostDetail')
        } else {
            setOpenlogin(true)
        }
    }

    const handleHost = () => {
        if (isLoggedin) {
            Navigate('/hostproperty')
        }
    }

    return (
        <>
            {ishosted ? (
                <Box
                    display={'flex'}
                    sx={{
                        cursor: 'pointer',
                    }}
                    flexDirection={'row'}
                    component={'span'}
                    onClick={handleHost}
                >
                    <VerifiedIcon color="info" />
                    <Typography>Start hosting</Typography>
                </Box>
            ) : (
                <Box
                    component={'span'}
                    sx={{
                        paddingTop: 2,
                        cursor: 'pointer',
                    }}
                    onClick={becomeAhost}
                >
                    Host an experience
                </Box>
            )}
        </>
    )
}

export default BecomeHost
