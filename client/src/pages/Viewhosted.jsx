import { Box,Typography,Container} from '@mui/material'
import React,{useContext} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import HostPropetyCard from '../component/HostPropertyCard'
import { ExternalContext } from '../context/CustomContext'
import { useNavigate } from 'react-router-dom'
import { deleteProperty } from '../api/api'
import { RemoveProperties } from '../Redux/properties/propertiesAction'

export default function Viewhosted() {
    let userID = useSelector(state => state.user.userDetails._id)
    let hostedProperty = useSelector(state => state.properties.propertyArray.filter(item => item.userid == userID))
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const {setPropertyEdit}=useContext(ExternalContext)
    function editProperty(id) {
        let PropertyToedit = hostedProperty.find(item => item._id == id)
        setPropertyEdit(PropertyToedit)
        navigate('/Edit-listed-property')
    }

    function removeProperty(id) {
        deleteProperty(id).then(() => {
            dispatch(RemoveProperties(id))
        }).catch((err)=>alert(err))
    }

    return (
        <Box mt={5} >
            <Container maxWidth='xl' sx={{width:'94%'}} >
                <Typography variant='h4' color={'#955251'} fontWeight={600} >Listed Property</Typography>
                <HostPropetyCard  editProperty={editProperty} removeProperty={removeProperty}  property={hostedProperty} />
            </Container> 
        </Box>
    )  
}