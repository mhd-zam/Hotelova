import * as React from 'react'
import { Grid, Box, styled, CardMedia, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'

import Rating from '@mui/material/Rating'
import { Stack } from '@mui/system'
import Swipeble from './Swipeble'

const FavoriteIcon = styled(FavoriteSharpIcon)({
    position: 'absolute',
    top: '5px',
    right: '5px',
    color: 'white',
    zIndex: 1,
    cursor: 'pointer',
})

function ProductCard({
    property,
    callback,
    addtowishlist,
    removeFromWishlist,
    wishlist,
}) {
    const matches = useMediaQuery('(min-width:600px)')
    return (
        <Grid container spacing={1}>
            {property?.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={3} lg={3}>
                    <Card
                        className=""
                        sx={{
                            maxWidth: matches ? 280 : 340,
                            boxShadow: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <Box
                            component={'div'}
                            sx={{
                                position: 'relative',
                                bgcolor: 'transparent',
                            }}
                        >
                            {wishlist &&
                                (item?.wishlist ? (
                                    <FavoriteIcon
                                        sx={{ color: 'red' }}
                                        onClick={() => {
                                            removeFromWishlist(item._id)
                                        }}
                                    />
                                ) : (
                                    <FavoriteIcon
                                        onClick={() => {
                                            addtowishlist(item)
                                        }}
                                    />
                                ))}

                            <Swipeble>
                                {item['images']?.map((img, index) => (
                                    <CardMedia
                                        key={index}
                                        component="img"
                                        sx={{ height: 270, borderRadius: 3 }}
                                        onClick={() => {
                                            callback(item._id)
                                        }}
                                        src={img}
                                    />
                                ))}
                            </Swipeble>
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
                            <Typography variant="body2" color="text.secondary">
                                {item.Address}
                            </Typography>
                            <Rating
                                size="small"
                                name="read-only"
                                color=""
                                value={3.5}
                                readOnly
                            />
                            <Typography variant="body1" bold>
                                ₹{item.Price}{' '}
                                <Typography variant="caption">
                                    / night
                                </Typography>
                            </Typography>
                        </Stack>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductCard
