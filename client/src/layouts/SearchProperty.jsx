import React, { useCallback, useEffect, useState } from 'react'
import { Box, Container, Typography, Grid, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertyType, postwishlist, searchProperty } from '../api/api'
import ProductCard1 from '../component/ProductCard1'
import { addfavourite } from '../Redux/properties/propertiesAction'
import { useNavigate } from 'react-router-dom'
import { addSingleProperty } from '../Redux/singleProperty/singlePropAction'
import {
    addtowishlist,
    removefromwishlist,
} from '../Redux/wishlist/wishlistAction'
import { ExternalContext } from '../context/CustomContext'
import { useContext } from 'react'
import FilterBar from './FilterBar'
function SearchProperty() {
    const naviagate = useNavigate()
    const destination = useSelector((state) => state.search.destination)
    const checkin = useSelector((state) => state.search.checkin)
    const checkout = useSelector((state) => state.search.checkout)
    const [Property, setProperty] = React.useState([])
    const userlogged = useSelector((state) => state.user.isLoggedin)
    const dispatch = useDispatch()
    const userid = useSelector((state) => state.user.userDetails?._id)
    const wishlist = useSelector((state) => state.wishlist?.wishlistArray)
    const { setOpenlogin } = useContext(ExternalContext)
    const [propertType, setPropertyType] = useState([])
    const [categoryFiter, setCategoryFilter] = useState('All')
    const [filterPropery, setFilteredProperty] = useState([])
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [MAXIMUM, setMAXIMUM] = useState(0)
    const [MINIMUM, setMINIMUM] = useState(0)
    const matches = useMediaQuery('(min-width:800px)')
    useEffect(() => {
        async function getSearchProperty() {
            try {
                const { data } = await searchProperty(
                    destination,
                    checkin,
                    checkout
                )
                wishlist?.forEach((item) => {
                    let index = data.findIndex((prop) => prop._id === item?._id)
                    if (index != -1) {
                        data[index].wishlist = true
                    }
                })
                setProperty(data)
                setFilteredProperty(data)
                const response = await getPropertyType()
                const maxValue = data.reduce((acc, item) => {
                    return Math.max(acc, item.Price)
                }, 0)
                const minValue = data.reduce((acc, item) => {
                    return Math.min(acc, item.Price)
                }, Number.MAX_SAFE_INTEGER)
                setMin(minValue)
                setMax(maxValue)
                setMAXIMUM(maxValue)
                setMINIMUM(minValue)
                setPropertyType(response.data.map((item) => item.RoomType))
            } catch (err) {
                alert(err)
            }
        }
        getSearchProperty()
    }, [])

    function handlePrice(e) {
        let value = e.target.value
        console.log(value)
        setMin(value[0])
        setMax(value[1])
        const newFilteredProperty = Property.filter(
            (item) => item.Price >= value[0] && item.Price <= value[1]
        )
        setFilteredProperty(newFilteredProperty)
    }

    function navigetTosinglepage(id) {
        let singleProperty = Property.find((item) => item._id == id)
        dispatch(addSingleProperty(singleProperty))
        naviagate('/propertyDetail')
    }

    useEffect(() => {
        if (categoryFiter !== 'All') {
            const newFilteredProperty = Property.filter(
                (item) => item.RoomType === categoryFiter
            )
            setFilteredProperty(newFilteredProperty)
        } else {
            setFilteredProperty(Property)
        }
    }, [categoryFiter])

    function ProductCard() {
        const result = filterPropery.map((item, index) => {
            return (
                <ProductCard1
                    key={index}
                    property={item}
                    callback={navigetTosinglepage}
                    addtowishlist={addtofavourite}
                    removeFromWishlist={removefromwishlist}
                    wishlist={true}
                    size={4}
                />
            )
        })
        return result
    }

    const addtofavourite = useCallback(
        async (property) => {
            if (userlogged) {
                try {
                    await postwishlist(userid, property._id)
                    dispatch(addfavourite(property._id))
                    dispatch(addtowishlist(property))
                } catch (err) {
                    alert(err)
                }
            } else {
                setOpenlogin(true)
            }
        },
        [wishlist]
    )
    return (
        <Box mt={4}>
            <Container maxWidth="xl" sx={{ width: '94%' }}>
                {Property.length == 0 ? (
                    <Typography textAlign={'center'}>
                        Result Not Found
                    </Typography>
                ) : (
                    <Box
                        display={'flex'}
                        flexDirection={matches ? 'row' : 'column'}
                    >
                        <FilterBar
                            propertType={propertType}
                            setCategoryFilter={setCategoryFilter}
                            handlePrice={handlePrice}
                            MIN={min}
                            MAX={max}
                            MAXIMUM={MAXIMUM}
                            MINIMUM={MINIMUM}
                        />
                        <Grid container>
                            <ProductCard />
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

export default SearchProperty
