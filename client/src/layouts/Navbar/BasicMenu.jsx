import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector, useDispatch } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'
import { ExternalContext } from '../../context/CustomContext'
import { logout } from '../../Redux/user/userAction'
import { LogoutApi } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { logoutWishlist } from '../../Redux/wishlist/wishlistAction'

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null)
    const { setOpenlogin } = useContext(ExternalContext)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const isLoggedin = useSelector((state) => state.user.isLoggedin)
    const isHosted = useSelector((state) => state.user.ishosted)
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogin = () => {
        setOpenlogin(true)
        handleClose()
    }

    const handlelogout = () => {
        LogoutApi().then(() => {
            dispatch(logout())
            dispatch(logoutWishlist())
            navigate(window.location)
            setAnchorEl(null)
        })
    }

    const handleNavigate = (url) => {
        navigate(url)
        setAnchorEl(null)
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="secondary"
            >
                <Box
                    boxShadow={1}
                    alignItems="center"
                    bgcolor={'white'}
                    justifyContent="center"
                    width={60}
                    height={35}
                    borderRadius={8}
                >
                    <MenuIcon sx={{ marginBottom: 0.6 }} fontSize="small" />
                    <AccountCircleIcon fontSize="large" />
                </Box>
            </Button>
            <Menu
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: 120,
                    },
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {isLoggedin ? (
                    <>
                        {isHosted && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        handleNavigate('/view-listed-property')
                                    }}
                                >
                                    view Listed
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleNavigate('/Reservation')
                                    }}
                                >
                                    Reservations
                                </MenuItem>
                            </>
                        )}

                        <MenuItem
                            onClick={() => {
                                handleNavigate('/profile')
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleNavigate('/ViewChat')
                            }}
                        >
                            Message
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleNavigate('/Wishlist')
                            }}
                        >
                            Wishlist
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleNavigate('/Bookings')
                            }}
                        >
                            Bookings
                        </MenuItem>
                        <MenuItem onClick={handlelogout}>Logout</MenuItem>
                    </>
                ) : (
                    <div>
                        <MenuItem onClick={handleLogin}>Login</MenuItem>
                        <MenuItem onClick={handleLogin}>signup</MenuItem>
                    </div>
                )}
            </Menu>
        </div>
    )
}
