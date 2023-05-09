import { Box, Typography, Container } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HostPropetyCard from '../component/HostPropertyCard'
import { ExternalContext } from '../context/CustomContext'
import { useNavigate } from 'react-router-dom'
import { deleteProperty, getAllHostProperty } from '../api/api'
import PermissionAlert from '../component/PermissionAlert'

export default function Viewhosted() {
    let userID = useSelector((state) => state.user.userDetails._id)
    const [open, setopen] = React.useState(false)
    const [hostedProperty, setHostProperty] = useState([])
    const [id, setid] = React.useState(null)
    const { setShowErr } = useContext(ExternalContext)
    useEffect(() => {
        async function getHostPropertylist() {
            try {
                const { data } = await getAllHostProperty(userID)
                console.log(data)
                setHostProperty(data)
            } catch (err) {
                setShowErr(true)
            }
        }
        getHostPropertylist()
    }, [])
    const navigate = useNavigate()
    const { setPropertyEdit } = useContext(ExternalContext)
    function editProperty(id) {
        let PropertyToedit = hostedProperty.find((item) => item._id == id)
        setPropertyEdit(PropertyToedit)
        navigate('/Edit-listed-property')
    }

    
    function alertPop(ID) {
        setid(ID)
        setopen(true)
    }

    function removeProperty() {
        deleteProperty(id)
            .then(() => {
                setHostProperty((prev) =>prev.filter((item) => item._id !== id))
                setopen(false)
            })
            .catch(() => setShowErr(true))
    }

    function CancelAction() {
        setopen(false)
    }


    return (
        <Box mt={5}>
            <Container maxWidth="xl" sx={{ width: '94%' }}>
                <Typography variant="h4" color={'#955251'} fontWeight={600}>
                    Listed Property
                </Typography>
                <HostPropetyCard
                    editProperty={editProperty}
                    removeProperty={alertPop}
                    property={hostedProperty}
                />
                <PermissionAlert
                    open={open}
                    content={'Do you want to delete the property?'}
                    title={'Remove Property'}
                    Agreecallback={removeProperty}
                    Cancelcallback={CancelAction}
                />
            </Container>
        </Box>
    )
}
