import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { Box, Typography, Button } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'

function Somethingwentwrong() {
    let player = useRef(null)
    return (
        <Box mt={15} textAlign={'center'}>
            <Player
                ref={player}
                autoplay={true}
                controls={true}
                src={
                    'https://assets10.lottiefiles.com/packages/lf20_ekkn6tn3.json'
                }
                keepLastFrame={true}
                style={{ height: '40vh', width: '80vw' }}
            />
            <Typography variant='h4' >Something went wrong</Typography>
            <Typography>Try refreshing the page</Typography>
            <Button onClick={()=>{window.location.reload()}} >
                <ReplayIcon sx={{ color: 'blue' }}  fontSize="large" />
            </Button>
        </Box>
    )
}

export default Somethingwentwrong
