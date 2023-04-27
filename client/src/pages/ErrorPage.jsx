import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { Box } from '@mui/material'
function ErrorPage() {
    let player = useRef(null)

    return (
        <Box mt={15}>
            <Player
                ref={player}
                autoplay={true}
                controls={true}
                src={
                    'https://assets6.lottiefiles.com/private_files/lf30_wvfo5uzg.json'
                }
                style={{ height: '300px', width: '300px' }}
            />
        </Box>
    )
}

export default ErrorPage
