import React, { useContext } from 'react'
import LinearStepper from '../layouts/host/LinearStepper'
import { CssBaseline, Container, Paper, Box } from '@mui/material'
import { ExternalContext } from '../context/CustomContext'
import Somethingwentwrong from './Somethingwentwrong'

function Hostproperty() {
    const defaultData = {
        PropertyName: '',
        Description: '',
        RoomType: '',
        Price: '',
        Facility: {
            Bedrooms: 1,
            Bathrooms: 1,
            Kitchen: 1,
            Balcony: 1,
        },
        Address: '',
        coordinates: {
            lat: Number,
            log: Number,
        },
        Amenties: {},
        images: [],
    }
    const { ShowErr } = useContext(ExternalContext)
    const isEdit = false
    return ShowErr ? (
        <Somethingwentwrong />
    ) : (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
                <Paper
                    component={Box}
                    sx={{ boxShadow: 20, borderRadius: 5 }}
                    p={5}
                >
                    <LinearStepper defaultData={defaultData} isEdit={isEdit} />
                </Paper>
            </Container>
        </>
    )
}

export default Hostproperty
