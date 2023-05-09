import React,{useContext} from 'react'
import { useForm, Controller } from 'react-hook-form'
import InputText from '../../component/ReusebleTextField'
import { Box, Paper, Typography } from '@mui/material'
import BtnComponent from '../../component/BtnComponent'
import { useSelector, useDispatch } from 'react-redux'
import { hostRoute, sendHostDetails } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { hostRequest } from '../../Redux/user/userAction'
import { ExternalContext } from '../../context/CustomContext'
export default function HostApplyPage() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()
    const applied = useSelector((state) => state.user.hostApplied)
    const { setShowErr } = useContext(ExternalContext)
    const dispatch = useDispatch()
    let userid = useSelector((state) => state.user.userDetails._id)
    function Submit(data) {
        sendHostDetails(data, userid)
            .then(() => {
                hostRoute({ id: userid }).then(() => {
                    dispatch(hostRequest())
                })
            })
            .catch(() => {
                setShowErr(true)
            })
    }

    const navigate = useNavigate()
    function handlehome() {
        navigate('/')
    }
    return (
        <Box
            component={'body'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
            }}
        >
            {applied ? (
                <Box alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="h4">successfully submited</Typography>
                    <Typography variant="h6">
                        The request to become host will be approved after
                        verification
                    </Typography>
                    <BtnComponent
                        variant={'contained'}
                        callback={handlehome}
                        content={'back to home'}
                    />
                </Box>
            ) : (
                <Paper sx={{ width: 400, p: 1 }}>
                    <Box sx={{ maxWidth: 500 }}>
                        <form onSubmit={handleSubmit(Submit)}>
                            <label>FullName</label>
                            <Controller
                                name="FullName"
                                control={control}
                                rules={{ required: true, pattern: /[^\s\\]/ }}
                                render={({ field }) => (
                                    <InputText
                                        placeholder={'fullName'}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.FullName && (
                                <span>FullName is required</span>
                            )}
                            <Box sx={{ marginTop: '10px' }} />
                            <label>DateOfBirth</label>
                            <Controller
                                name="DateOfBirth"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputText
                                        placeholder={'DateOfBirth'}
                                        type={'date'}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.DateOfBirth && (
                                <span>DateOfBirth is required</span>
                            )}
                            <Box sx={{ marginTop: '10px' }} />
                            <label>AadharNumber</label>
                            <Controller
                                name="AadharNumber"
                                control={control}
                                rules={{ required: true, pattern: /[^\s\\]/ }}
                                render={({ field }) => (
                                    <InputText
                                        placeholder={'AadharNumber'}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.AadharNumber && (
                                <span>AadharNumber is required</span>
                            )}
                            <Box sx={{ marginTop: '10px' }} />
                            <label>PanCard</label>
                            <Controller
                                name="PanCard"
                                control={control}
                                rules={{ required: true, pattern: /[^\s\\]/ }}
                                render={({ field }) => (
                                    <InputText
                                        placeholder={'PanCard'}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.PanCard && <span>PanCard is required</span>}
                            <Box sx={{ marginTop: '10px' }} />
                            <label>Address</label>
                            <Controller
                                name="Address"
                                control={control}
                                rules={{ required: true, pattern: /[^\s\\]/ }}
                                render={({ field }) => (
                                    <InputText
                                        placeholder={'Address'}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.Address && <span>Address is required</span>}
                            <Box sx={{ marginTop: '10px' }} />
                            <label>RentalLicensePermit</label>
                            <Controller
                                name="RentalLicensePermit"
                                control={control}
                                rules={{ required: true, pattern: /[^\s\\]/ }}
                                render={({ field }) => (
                                    <InputText
                                        placeholder={'Rental License Number'}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.RentalLicensePermit && (
                                <span>Rental License Number is required</span>
                            )}
                            <Box sx={{ marginTop: '10px' }} />

                            <BtnComponent
                                type={'submit'}
                                content={'submit'}
                                variant={'contained'}
                            />
                        </form>
                    </Box>
                </Paper>
            )}
        </Box>
    )
}
