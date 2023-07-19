import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { Box } from '@mui/material'
function Notsearchresult() {
    let player = useRef(null)

    return (
        <Box mt={15}>
            <Player
                ref={player}
                autoplay={true}
                controls={true}
                src={
                    'https://lottie.host/da5366e7-20d4-49e0-a31f-cae9db5ffb69/GgjRZ2XgSF.json'
                }
                style={{ height: '300px', width: '300px' }}
                keepLastFrame={true}
            />
        </Box>
    )
}

export default Notsearchresult
