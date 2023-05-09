import React, { useRef, useEffect } from 'react'
// import { verifyOrder } from '../api/api'
import { Player } from '@lottiefiles/react-lottie-player'

import { Box, Typography } from '@mui/material'
import { verifyOrder } from '../api/api'
import { useNavigate } from 'react-router-dom'
import { TransactionClose } from '../Redux/Checkout/CheckoutAction'
import { useDispatch } from 'react-redux'

function CheckoutSuccess() {
    let player = useRef(null)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = React.useState(false)
    useEffect(() => {
        verifyOrder()
            .then(() => {
                setState(true)
            })
            .catch(() => {
                navigate('/cancel')
            })
        return () => {
            dispatch(TransactionClose())
        }
    }, [])

    return (
        <Box mt={15}>
            {state ? (
                <>
                    <Player
                        ref={player}
                        autoplay={true}
                        controls={true}
                        src={
                            'https://assets1.lottiefiles.com/packages/lf20_atippmse.json'
                        }
                        style={{ height: '300px', width: '300px' }}
                        direction={1000}
                        keepLastFrame={true}
                    />
                    <Typography
                        mt={2}
                        color={'green'}
                        textAlign={'center'}
                        variant="h2"
                    >
                        Booking being confirmed
                    </Typography>
                </>
            ) : (
                <>
                    <Player
                        ref={player}
                        autoplay={true}
                        controls={true}
                        loop
                        src={
                            ' https://assets10.lottiefiles.com/packages/lf20_kxsd2ytq.json'
                        }
                        style={{ height: '300px', width: '300px' }}
                    />
                    <Typography textAlign={'center'} variant="h6">
                        Booking your dream getaway takes time, but trust us, its
                        worth the wait!
                    </Typography>
                </>
            )}
        </Box>
    )
}

export default CheckoutSuccess
