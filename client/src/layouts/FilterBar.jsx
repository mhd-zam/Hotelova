import React from 'react'
import AirbnbSlider, { AirbnbThumbComponent } from './style'
import { Typography, Card, Stack, TextField, Box } from '@mui/material'

function FilterBar({
    propertType,
    setCategoryFilter,
    handlePrice,
    MIN = 1000,
    MAX = 10000,
    MAXIMUM,
    MINIMUM,
}) {
    return (
        <Box mr={5}>
            <Card
                sx={{
                    padding: 4,
                    mt: 2,
                    width: 250,
                    height: 465,
                    m: 2,
                    boxShadow: 4,
                }}
            >
                <Stack spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                        Filter By Property Type
                    </Typography>
                    <Typography
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setCategoryFilter('All')
                        }}
                    >
                        All
                    </Typography>
                    {propertType.map((Elemt, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setCategoryFilter(Elemt)
                            }}
                        >
                            {Elemt}
                        </Typography>
                    ))}
                    <Box m={2} />
                    <Typography variant="body1" fontWeight={600}>
                        Filter by price
                    </Typography>
                    <Stack direction={'row'}>
                        <TextField
                            id="outlined-size-small"
                            size="small"
                            disabled
                            value={MIN}
                            sx={{ width: 100 }}
                        />
                        <Typography p={1}>to</Typography>
                        <TextField
                            id="outlined-size-small"
                            size="small"
                            disabled
                            value={MAX}
                            sx={{ width: 100 }}
                        />
                    </Stack>
                    <AirbnbSlider
                        slots={{ thumb: AirbnbThumbComponent }}
                        onChange={handlePrice}
                        value={[MIN, MAX]}
                        min={MINIMUM}
                        max={MAXIMUM}
                    />
                </Stack>
            </Card>
        </Box>
    )
}

export default FilterBar
