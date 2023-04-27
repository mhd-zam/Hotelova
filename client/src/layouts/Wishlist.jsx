import React from 'react'
import { Typography, Container } from '@mui/material'
import ProductCard from '../component/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { addSingleProperty } from '../Redux/singleProperty/singlePropAction'
import { useNavigate } from 'react-router-dom'

function Wishlist() {
    const dispatch = useDispatch()
    const naviagate = useNavigate()
    const wishlist = useSelector((state) => state.wishlist?.wishlistArray)
    const Property = useSelector((state) => state.properties?.propertyArray)
    function navigetTosinglepage(id) {
        let singleProperty = Property.find((item) => item._id == id)
        dispatch(addSingleProperty(singleProperty))
        naviagate('/propertyDetail')
    }
    return (
        <Container
            maxWidth="xl"
            sx={{
                width: '94%',
            }}
        >
            <Typography pt={2} pb={2} color="primary" variant="h4">
                Wishlist
            </Typography>
            <ProductCard
                property={wishlist}
                callback={navigetTosinglepage}
                wishlist={false}
            />
        </Container>
    )
}

export default Wishlist
