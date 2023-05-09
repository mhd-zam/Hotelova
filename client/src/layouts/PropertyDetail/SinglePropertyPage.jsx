import React from 'react'
import { Box, CardMedia, Container, Typography, Card } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Stack } from '@mui/system'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import PaymentSection from './BookingCard'
import BedIcon from '@mui/icons-material/Bed'
import BathtubIcon from '@mui/icons-material/Bathtub'
import KitchenIcon from '@mui/icons-material/Kitchen'
import BalconyIcon from '@mui/icons-material/Balcony'
import Amenities from './Amenities'
import CommentAndRating from './CommentAndRating'

export default function SinglePropertyPage() {
    let { SingleProperty } = useSelector((state) => state.SingleProp)
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
                    <Box display={'flex'} p={4} flexDirection={'row'}>
                        <Typography
                            flexGrow={1}
                            variant="h4"
                        >{`${SingleProperty.RoomType} hosted by ${SingleProperty.host?.FullName}`}</Typography>
                        <  Avatar />
                    </Box>
                </Grid>
                <Card sx={{ mt: 2, boxShadow: 2 }}>
                    <Grid container mt={0} padding={3}>
                        <Grid item lg={6}>
                            <Stack direction={'column'} spacing={2} pt={0}>
                                <Stack
                                    direction={'column'}
                                    spacing={0}
                                    sx={{
                                        width: 300,
                                    }}
                                >
                                    <Typography variant="h5">
                                        Facilities
                                    </Typography>
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        m={2}
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Typography variant="inherit">
                                            <BedIcon
                                                fontSize="small"
                                                sx={{ marginRight: '4px' }}
                                            />
                                            {SingleProperty.Facility.Bedrooms}{' '}
                                            Rooms
                                        </Typography>
                                        <Typography variant="inherit">
                                            <BathtubIcon
                                                fontSize="small"
                                                sx={{ marginRight: '4px' }}
                                            />
                                            {SingleProperty.Facility.Bathrooms}{' '}
                                            Toilet
                                        </Typography>
                                    </Box>
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        m={2}
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Typography variant="inherit">
                                            <KitchenIcon
                                                fontSize="small"
                                                sx={{ marginRight: '4px' }}
                                            />
                                            {SingleProperty.Facility.Kitchen}{' '}
                                            Kitchen
                                        </Typography>
                                        <Typography variant="inherit">
                                            <BalconyIcon
                                                fontSize="small"
                                                sx={{ marginRight: '4px' }}
                                            />
                                            {SingleProperty.Facility.Balcony}{' '}
                                            Balcony
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Divider sx={{ mt: 1 }} />
                                <Typography variant="h5">About</Typography>
                                <Typography variant="body1">
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
                                <PaymentSection
                                    SingleProperty={SingleProperty}
                                />
                            )}
                        </Grid>
                        <Grid lg={12} sm={12}>
                            <Typography variant="h5">
                                Available Amenities
                            </Typography>
                            <Box pt={2}>
                                {amenity.map((item, index) => (
                                    <>
                                        <Amenities key={index} KEY={item} />
                                        <Box m={1} />
                                    </>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                    {SingleProperty.hostid != id && id ? (
                        <Grid item xs={12} md={6}>
                            <CommentAndRating SingleProperty={SingleProperty} />
                        </Grid>
                    ) : (
                        ''
                    )}
                </Card>
            </Box>
        </Container>
    )
}
