import { Typography, Container, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { viewAllProduct } from '../api/api'
import ProductCard from '../component/ProductCard'
import Banner from '../layouts/Navbar/Banner'
import { useDispatch, useSelector } from 'react-redux'
import { AddProperties } from '../Redux/properties/propertiesAction'
import MapPage from './MapPage'
import { Box } from '@mui/system'
import MapIcon from '@mui/icons-material/Map'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { addSingleProperty } from '../Redux/singleProperty/singlePropAction'
import { useNavigate } from 'react-router-dom'
function Home() {
    const dispatch = useDispatch()
    const naviagate = useNavigate()
    useEffect(() => {
        try {
            viewAllProduct().then(({ data }) => {
                dispatch(AddProperties(data))
            })
        } catch (err) {
            alert(err)
        }
    }, [])
    const Property = useSelector((state) => state.properties.propertyArray)
    const [notMap, setnotMap] = useState(true)

    function handlePage() {
        setnotMap((prev) => !prev)
    }

    function navigetTosinglepage(id) {
        let singleProperty = Property.find((item) => item._id == id)
        dispatch(addSingleProperty(singleProperty))
        naviagate('/propertyDetail')
    }

    return (
        <Box>
            {notMap && (
                <>
                    <Banner />
                    <Container
                        maxWidth="xl"
                        sx={{
                            width: '94%',
                        }}
                    >
                        <Typography pt={2} pb={2} color="primary" variant="h4">
              Looking for the perfect stay?
                        </Typography>
                        <ProductCard property={Property} callback={navigetTosinglepage} />
                    </Container>
                </>
            )}
            {notMap == false && <MapPage property={Property} />}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'sticky',
                    bottom: 60,
                    zIndex: 10,
                    width: '100%',
                }}
            >
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#222222',
                            color: 'white',
                            borderRadius: 6,
                            height: 50,
                        }}
                        onClick={handlePage}
                        size="medium"
                        endIcon={notMap ? <MapIcon /> : <FormatListBulletedIcon />}
                    >
                        {notMap ? 'Show Map' : 'Show List'}
                    </Button>
                </Box>
            </div>
        </Box>
    )
}

export default Home
