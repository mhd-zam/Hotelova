import * as React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
export default function Scrollloading({ size, numberofskelton }) {
    const matches = useMediaQuery('(min-width:600px)')
    const width = React.useRef()
    width.current = matches ? 290 : 320
    return (
        <>
            {numberofskelton.map((value,index) => (
                <Grid key={index} item xs={12} sm={4} md={3} mt={2} lg={size}>
                    <Stack spacing={1}>
                        <Skeleton
                            variant="rectangular"
                            sx={{ borderRadius: 4 }}
                            width={width.current}
                            height={270}
                        />
                        <Skeleton animation="wave" width={290} />
                        <Skeleton animation="wave" width={290} />
                        <Skeleton animation="wave" width={140} />
                    </Stack>
                </Grid>
            ))}
        </>
    )
}
