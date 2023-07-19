import React, { useContext } from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Divider,
    Container,
} from '@mui/material'
import { Stack } from '@mui/system'
import BasicMenu from './BasicMenu'
import CustomizedSnackbars from '../../component/Customsnak'
import CustomizedDialogs from '../../component/Modal'
import { ExternalContext } from '../../context/CustomContext'
import Authentication from '../../pages/Authentication'
import Enterusername from '../userAuth/userdetail'
import { useSelector } from 'react-redux'
import LanguageIcon from '@mui/icons-material/Language'
import { NavLink } from 'react-router-dom'
import BecomeHost from './BecomeHost'
import useMediaQuery from '@mui/material/useMediaQuery'

function Navbar() {
    const { openLogin, setOpenlogin } = useContext(ExternalContext)
    const Checkuserornot = useSelector((state) => state.user.Checkuserornot)
    const matches = useMediaQuery('(min-width:600px)')

    return (
        <>
            <Box>
                <Container maxWidth="xl" sx={{ width: '100%' }}>
                    <AppBar
                        sx={{ minWidth: '100%', boxShadow: 'none' }}
                        position="static"
                        color="nav"
                    >
                        <Toolbar>
                            <Typography
                                variant="h4"
                                sx={{ flexGrow: 1, fontWeight: 600 }}
                            >
                                {' '}
                                <NavLink
                                    to="/"
                                    style={{
                                        textDecoration: 'none',
                                        color: '#a64942',
                                    }}
                                >
                                    {' '}
                                    Hotelova.{' '}
                                </NavLink>{' '}
                            </Typography>
                            {matches ? (
                                <Box mr={1} mt={1}>
                                    <BecomeHost />
                                </Box>
                            ) : null}

                            <Stack direction="row" spacing={1.5} mr={0}>
                                <Box component={'span'} sx={{ paddingTop: 2 }}>
                                    <LanguageIcon fontSize="small" />
                                </Box>
                                <BasicMenu />
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </Container>
                <Divider />
                <div>
                    {Checkuserornot && (
                        <CustomizedDialogs
                            title={'userdetails'}
                            status={Checkuserornot}
                            callback={setOpenlogin}
                            modaloffbtn={true}
                        >
                            <Enterusername />
                        </CustomizedDialogs>
                    )}
                </div>
                <div style={{ position: 'fixed' }}>
                    {openLogin && (
                        <CustomizedDialogs
                            title={'Signup/Login'}
                            status={openLogin}
                            callback={setOpenlogin}
                            modaloffbtn={false}
                        >
                            <Authentication />
                        </CustomizedDialogs>
                    )}
                </div>
                <CustomizedSnackbars />
            </Box>
        </>
    )
}

export default Navbar
