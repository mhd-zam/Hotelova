import * as React from 'react'
import { Grid, Box, CardMedia, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/system'
import BtnComponent from './BtnComponent'
import { red, blue } from '@mui/material/colors'

function HostPropetyCard({ property, editProperty, removeProperty }) {
    //   const [fav, setfav] = React.useState(false);
    const matches = useMediaQuery('(min-width:600px)')
    const style1 = {
        bgcolor: blue[500],
    }

    const style2 = {
        bgcolor: red[500],
    }
    return (
        <React.Fragment>
            <Grid container xs={12} mt={2} spacing={2}>
                {property.map((item, index) => (
                    <Grid item key={item._id} md={3}>
                        <Card
                            className=""
                            sx={{
                                maxWidth: matches ? 200 : 300,
                                boxShadow: 'none',
                            }}
                        >
                            <Box
                                component={'div'}
                                sx={{
                                    position: 'relative',
                                    bgcolor: 'transparent',
                                }}
                            >
                                <CardMedia
                                    key={index}
                                    component="img"
                                    sx={{ height: 200, borderRadius: 3 }}
                                    src={item.images[0]}
                                />
                            </Box>
                            <Stack direction={'column'} spacing={0}>
                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    sx={{
                                        display: 'inline-block',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                    component=""
                                >
                                    {item.PropertyName}
                                </Typography>
                                <Typography variant="body1" bold>
                                    ₹{item.Price}{' '}
                                    <Typography variant="caption">
                                        /night
                                    </Typography>
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <BtnComponent
                                    variant={'contained'}
                                    style={style1}
                                    callback={() => {
                                        editProperty(item._id)
                                    }}
                                    content={'Modifiy'}
                                />
                                <BtnComponent
                                    variant={'contained'}
                                    style={style2}
                                    callback={() => {
                                        removeProperty(item._id)
                                    }}
                                    content={'Remove'}
                                />
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default HostPropetyCard
