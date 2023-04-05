import SwipeableViews from 'react-swipeable-views'
import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box } from '@mui/material'

function Swipeble({ children }) {
    
    const [activeindex, setActiveindex] = useState(0)
    return (
        <React.Fragment>
            <SwipeableViews index={activeindex} enableMouseEvents>
                {children}
            </SwipeableViews>
            <Box
                onClick={()=>{setActiveindex((prev)=>prev>0?prev-1:5)}}
                component={'div'}
                sx={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    zIndex: 1,
                    padding: 0.4,
                    position: 'absolute',
                    left: '5%',
                    bottom: '40%',
                    borderRadius: 10,
                }}
            >
                <ArrowBackIosNewIcon  sx={{ fontSize: 15 }} />
            </Box>
            <Box
                onClick={()=>{setActiveindex((prev)=>prev<5?prev+1:0)}} 
                component={'div'}
                sx={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    zIndex: 1,
                    padding: 0.4,
                    position: 'absolute',
                    bottom: '40%',
                    left: '86%',
                    borderRadius: 10,
                }}
            >
                <ArrowForwardIosIcon  sx={{ fontSize: 15 }} />
            </Box>
        </React.Fragment>
    )
}

export default Swipeble
