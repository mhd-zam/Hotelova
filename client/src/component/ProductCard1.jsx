import * as React from 'react'
import { Box, styled, CardMedia, useMediaQuery, Grid } from '@mui/material'
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
const ProductCard1 = React.forwardRef(
    (
        {
            property,
            callback,
            addtowishlist,
            removeFromWishlist,
            wishlist,
            size,
        },
        ref
    ) => {
        const matches = useMediaQuery('(min-width:600px)')

        return (
            <Grid item xs={12} sm={6} md={size} lg={size}>
                <Card
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
                            (property?.wishlist ? (
                                <FavoriteIcon
                                    sx={{ color: 'red' }}
                                    onClick={() => {
                                        removeFromWishlist(property._id)
                                    }}
                                />
                            ) : (
                                <FavoriteIcon
                                    onClick={() => {
                                        addtowishlist(property)
                                    }}
                                />
                            ))}

                        <Swipeble>
                            {property['images']?.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    sx={{
                                        height: 270,
                                        borderRadius: 3,
                                    }}
                                    onClick={() => {
                                        callback(property._id)
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
                            {property.PropertyName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {property.Address}
                        </Typography>
                        <Rating
                            size="small"
                            name="read-only"
                            color=""
                            value={3.5}
                            readOnly
                        />
                        <Typography variant="body1" bold>
                            ₹{property.Price}
                            <Typography variant="caption">/ night</Typography>
                        </Typography>
                    </Stack>
                </Card>
                <Box ref={ref} />
            </Grid>
        )
    }
)

ProductCard1.displayName = 'ProductCard1'

export default ProductCard1
