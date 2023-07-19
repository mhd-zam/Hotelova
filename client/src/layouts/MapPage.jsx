import * as React from 'react'
import Map, {
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box, CardMedia, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

function MapPage({ property }) {
    const [value, setvalue] = React.useState(null)

    function handlePop(id) {
        setvalue(id)
    }

    React.useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <Box>
            <Map
                initialViewState={{
                    latitude: 20.5,
                    longitude: 78.9,
                    zoom: 4,
                }}
                style={{ width: '100vw', height: '110vh' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.REACT_APP_MAP_ACCESSTOKEN}
            >
                <NavigationControl />
                <GeolocateControl />
                {property?.map((item, index) => (
                    <Box key={index}>
                        <Marker
                            longitude={item.coordinates?.log}
                            latitude={item.coordinates?.lat}
                            style={{ cursor: 'pointer' }}
                        >
                            <Box
                                width={60}
                                height={30}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: 'white',
                                    pt: 0.5,
                                }}
                                textAlign="center"
                                onClick={() => handlePop(item._id)}
                                boxShadow={20}
                            >
                                <Typography fontSize={15} fontWeight={700}>
                                    ₹{item.Price}
                                </Typography>
                            </Box>
                        </Marker>
                        {item._id == value && (
                            <Popup
                                longitude={item.coordinates.log}
                                latitude={item.coordinates.lat}
                                closeButton={true}
                                anchor="top"
                                closeOnClick={false}
                                maxWidth={300}
                            >
                                <Box>
                                    <Stack direction={'row'}>
                                        <CardMedia
                                            component={'img'}
                                            src={item.images[0]}
                                            alt="img"
                                            sx={{
                                                width: '150px',
                                                height: '150px',
                                            }}
                                        />
                                        <Box
                                            maxWidth={150}
                                            p={1}
                                            letterSpacing={1}
                                        >
                                            <Typography fontSize={20}>
                                                {item.PropertyName}
                                            </Typography>
                                            <StarIcon fontSize="inherit" />
                                            <Box component={'span'}>4.5</Box>
                                            <Typography fontSize={10}>
                                                {item.Address}
                                            </Typography>
                                            <Typography fontSize={15}>
                                                ₹{item.Price}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Popup>
                        )}
                    </Box>
                ))}
            </Map>
        </Box>
    )
}

export default MapPage
