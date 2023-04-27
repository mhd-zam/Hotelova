import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { Box, Typography } from '@mui/material'

function CancelCheckout() {
    return (
        <Box mt={15}>
            <Player
                autoplay={true}
                controls={true}
                src={
                    'https://assets10.lottiefiles.com/packages/lf20_yw3nyrsv.json'
                }
                style={{ height: '300px', width: '300px' }}
                direction={1000}
                keepLastFrame={true}
            />
            <Typography variant="h2" textAlign={'center'} color={'red'}>
                Booking Cancelled
            </Typography>
        </Box>
    )
}

export default CancelCheckout
