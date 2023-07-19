import React, { useCallback, useEffect, useState } from 'react'
import { Box, Container, Grid, useMediaQuery } from '@mui/material'
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
import Notsearchresult from '../pages/Notsearchresult'
import Scrollloading from '../pages/Scrollloading'
function SearchProperty() {
    const naviagate = useNavigate()
    const { setShowErr } = useContext(ExternalContext)
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
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(Number.MAX_SAFE_INTEGER)
    const [MAXIMUM, setMAXIMUM] = useState(0)
    const [MINIMUM, setMINIMUM] = useState(0)
    const matches = useMediaQuery('(min-width:800px)')
    const [loading, setLoading] = useState(true)
    const Skeleton = Array.from({ length: 6 })
    useEffect(() => {
        setLoading(true)
        async function getSearchProperty() {
            try {
                const { data } = await searchProperty(
                    destination,
                    checkin,
                    checkout,
                    categoryFiter,
                    min,
                    max
                )
                wishlist?.forEach((item) => {
                    let index = data.result.findIndex(
                        (prop) => prop._id === item?._id
                    )
                    if (index != -1) {
                        data.result[index].wishlist = true
                    }
                })
                setProperty(data.result)
                const response = await getPropertyType()
                setMAXIMUM(data.maxAmt)
                setMINIMUM(data.minAmt)
                setPropertyType(response.data.map((item) => item.RoomType))
                if (data.result) {
                    setLoading(false)
                }
            } catch (err) {
                setShowErr(true)
            }
        }
        getSearchProperty()
    }, [categoryFiter, min, max])

    function handlePrice(e) {
        let value = e.target.value
        setMin(value[0])
        setMax(value[1])
    }

    function navigetTosinglepage(id) {
        let singleProperty = Property.find((item) => item._id == id)
        dispatch(addSingleProperty(singleProperty))
        naviagate('/propertyDetail')
    }

    function ProductCard() {
        const result = Property.map((item, index) => {
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
                    setShowErr(true)
                }
            } else {
                setOpenlogin(true)
            }
        },
        [wishlist]
    )

    return (
        <Box mt={4}>
            <Container maxWidth="xl" sx={{ width: '100%' }}>
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
                    {Property.length == 0 ? (
                        <Box
                            justifyContent={'center'}
                            width={'100%'}
                            alignItems={'center'}
                        >
                            <Notsearchresult />
                        </Box>
                    ) : (
                        <Grid container>
                            {loading ? (
                                <Scrollloading
                                    size={4}
                                    numberofskelton={Skeleton}
                                />
                            ) : (
                                <ProductCard />
                            )}
                        </Grid>
                    )}
                </Box>
            </Container>
        </Box>
    )
}

export default SearchProperty
