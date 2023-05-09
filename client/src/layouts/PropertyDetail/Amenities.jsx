import React from 'react'
import { Typography } from '@mui/material'
import KitchenIcon from '@mui/icons-material/Kitchen'
import WifiIcon from '@mui/icons-material/Wifi'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import PoolIcon from '@mui/icons-material/Pool'
import TvIcon from '@mui/icons-material/Tv'
import AcUnitIcon from '@mui/icons-material/AcUnit'
function Amenities({ KEY }) {
    switch (KEY) {
        case 'Wifi':
            return (
                <Typography variant="body">
                    <WifiIcon fontSize="small" /> wifi{' '}
                </Typography>
            )
        case 'Washing Machine':
            return (
                <Typography variant="body">
                    <KitchenIcon fontSize="small" /> Kitchen{' '}
                </Typography>
            )
        case 'Gym':
            return (
                <Typography variant="body">
                    <FitnessCenterIcon fontSize="small" /> Gym{' '}
                </Typography>
            )
        case 'Swimmmingpool':
            return (
                <Typography variant="body">
                    <PoolIcon fontSize="small" /> Swimming pool{' '}
                </Typography>
            )
        case 'Television':
            return (
                <Typography variant="body">
                    <TvIcon fontSize="small" /> Television
                </Typography>
            )
        case 'Airconditioner':
            return (
                <Typography variant="body">
                    <AcUnitIcon fontSize="small" />
                    Aircondtion
                </Typography>
            )
        default:
            return null
    }
}

export default Amenities
