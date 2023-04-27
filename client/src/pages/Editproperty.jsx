import React, { useContext } from 'react'
import LinearStepper from '../layouts/host/LinearStepper'
import { CssBaseline, Container, Paper, Box } from '@mui/material'
import { ExternalContext } from '../context/CustomContext'

function Editproperty() {
    const { propertyEdit } = useContext(ExternalContext)
    let defaultData = propertyEdit
    const isEdit = true
    return (
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

export default Editproperty
