import * as React from 'react'
import { Box, CardMedia, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import KitchenIcon from '@mui/icons-material/Kitchen'
import WifiIcon from '@mui/icons-material/Wifi'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import PoolIcon from '@mui/icons-material/Pool'
import TvIcon from '@mui/icons-material/Tv'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { Stack } from '@mui/system'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import BookingCard from './BookingCard'

function Amenities({ KEY }) {
    switch (KEY) {
        case 'Wifi':
            return (
                <Typography variant="body">
                    <WifiIcon fontSize="small" /> wifi{' '}
                </Typography>
            )
        case 'Washing Machine':
            return (
                <Typography variant="body">
                    <KitchenIcon fontSize="small" /> Kitchen{' '}
                </Typography>
            )
        case 'Gym':
            return (
                <Typography variant="body">
                    <FitnessCenterIcon fontSize="small" /> Gym{' '}
                </Typography>
            )
        case 'Swimmmingpool':
            return (
                <Typography variant="body">
                    <PoolIcon fontSize="small" /> Swimming pool{' '}
                </Typography>
            )
        case 'Television':
            return (
                <Typography variant="body">
                    <TvIcon fontSize="small" /> Television
                </Typography>
            )
        case 'Airconditioner':
            return (
                <Typography variant="body">
                    <AcUnitIcon fontSize="small" />
                    Aircondtion
                </Typography>
            )
        default:
            return null
    }
}

export default function SingleProperty({ property }) {
    let { SingleProperty } = property
    let id = useSelector((state) => state.user.userDetails?._id)
    let item = SingleProperty.Amenties
    let amenity = []

    for (let key in item) {
        if (item[key] === true) {
            amenity.push(key)
        }
    }

    return (
        <Container maxWidth="xl" sx={{ width: '94%' }}>
            <Box sx={{ flexGrow: 1, pt: 2 }}>
                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={'600'}
                    p={2}
                    pl={0}
                >
                    {SingleProperty.PropertyName}
                </Typography>
                <Typography variant="h6" fontWeight={'500'} p={2} pl={0}>
                    <LocationOnIcon fontSize="small" />
                    {SingleProperty.Address}
                </Typography>
                <Grid container spacing={1}>
                    {SingleProperty.images?.map((img, index) => (
                        <Grid
                            {...{ xs: 12, sm: 6, md: 4, lg: 4 }}
                            key={index}
                            minHeight={160}
                        >
                            <CardMedia sx={{ height: 200 }} image={img} />
                        </Grid>
                    ))}
                </Grid>
                <Grid container mt={2}>
                    <Grid item lg={6}>
                        <Stack direction={'column'} spacing={2} pt={2}>
                            <Box display={'flex'} flexDirection={'row'}>
                                <Typography
                                    flexGrow={1}
                                    variant="h4"
                                >{`${SingleProperty.RoomType} hosted by ${SingleProperty.host.FullName}`}</Typography>
                                <Avatar></Avatar>{' '}
                            </Box>
                            <Typography
                                fontWeight={600}
                                variant="body1"
                            >{`${SingleProperty.Maxguest} guest/room. ${SingleProperty.Facility.Bedrooms} bedroom. ${SingleProperty.Facility.Bathrooms} toilet. ${SingleProperty.Facility.Balcony} balcony. ${SingleProperty.Facility.Kitchen} kitchen.`}</Typography>
                            <Divider sx={{ mt: 1 }} />
                            <Typography variant="h5">About</Typography>
                            <Typography variant="body1" maxWidth={500}>
                                {SingleProperty.Description}
                            </Typography>
                        </Stack>
                        <Divider sx={{ mt: 1 }} />
                    </Grid>

                    <Grid
                        item
                        lg={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}
                    >
                        {SingleProperty.hostid != id && (
                            <BookingCard SingleProperty={SingleProperty} />
                        )}
                    </Grid>

                    <Grid lg={12} pt={2}>
                        <Typography variant="h5">
                            Available Amenities
                        </Typography>
                        <Box width={300} pt={2}>
                            {amenity.map((item, index) => (
                                <>
                                    <Amenities key={index} KEY={item} />
                                    <Box m={1} />
                                </>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
