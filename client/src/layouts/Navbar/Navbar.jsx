import React, { useContext, useEffect } from 'react'
import { AppBar, Box, Toolbar, Typography,Divider,Container} from '@mui/material'
import { Stack } from '@mui/system'
import BasicMenu from './BasicMenu'
import CustomizedSnackbars from '../../component/Customsnak'
import CustomizedDialogs from '../../component/Modal'
import { ExternalContext } from '../../context/CustomContext'
import Authentication from '../../pages/Authentication'
import Enterusername from '../userAuth/userdetail'
import BtnComponent from '../../component/BtnComponent'
import { checkHostOrNot } from '../../api/api'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout, sethost } from '../../Redux/user/userAction'
import LanguageIcon from '@mui/icons-material/Language'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const {
        openLogin,
        setOpenlogin
    } = useContext(ExternalContext)
    const ishosted = useSelector(state => state.user.ishosted)
    const isLoggedin = useSelector(state => state.user.isLoggedin)
    const Checkuserornot = useSelector(state => state.user.Checkuserornot)
    const userDetails=useSelector(state=>state.user.userDetails)
    const dispatch=useDispatch()
    const Navigate = useNavigate()
    let style = { borderRadius: 5, width: 120, height: 50, fontSize: 10 }
    

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

    const handleHost = () => {
        if (isLoggedin) {
            Navigate('/hostproperty')
        }
    }

    const becomeAhost = () => {
        if (isLoggedin) {
            Navigate('/hostDetail')
        } else {
            setOpenlogin(true)
        }
       
    }

    return (
        <>
            <Box height={50} >
                <img height={50} width={'100%'} src='https://images.unsplash.com/photo-1614849286711-8d732eca224e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHw%3D&w=1000&q=80' alt=''/>
            </Box>
            <Box sx={{ position: 'sticky',top:0, zIndex: 5 }} >
                <Container maxWidth='xl' sx={{width:'98%'}} >
                    <AppBar sx={{ minWidth: '100%',boxShadow:'none'}} position="static" color="nav">
                        <Toolbar>
                           
                            <Typography
                                variant="h4"
                                sx={{ flexGrow: 1, fontWeight: 600}}
                            > <NavLink to='/' style={{textDecoration:'none',color:'#a64942'}} > Hotelova. </NavLink>  </Typography>
                            
                            <Stack direction="row"  spacing={1.5} mr={5} >
                                {ishosted ? (
                                    <BtnComponent
                                        variant={'contained'}
                                        style={style}
                                        callback={handleHost}
                                        icon={<VerifiedIcon color="info" />}
                                        content={'start hosting'}
                                    />
                                ) : (
                                    <Box component={'span'} sx={{paddingTop:2,cursor:'pointer'}} onClick={becomeAhost} >Host an experience</Box>
                                )}
                                <Box component={'span'} sx={{paddingTop:2}} >
                                    <LanguageIcon fontSize='small' />
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
