import React, { useEffect, useState } from 'react'
import { red } from '@mui/material/colors'
import {
    Card,
    Box,
    CardMedia,
    Checkbox,
    Stack,
    Typography,
    Grid,
} from '@mui/material'

import { Controller, useFormContext } from 'react-hook-form'
import { getAmenities } from '../../api/api'

function PropertyAmenties() {
    const { control } = useFormContext()
    const [amenities, setAmenities] = useState([])
    useEffect(() => {
        getAmenities()
            .then(({ data }) => {
                setAmenities(data)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    return (
        <Box component={'div'} minHeight={'50vh'}>
            <Typography variant="h4" m={2} maxWidth={450} ml={5}>
                Add amenities available at your place.
            </Typography>

            <Stack direction={'row'} pl={5} spacing={1}>
                <Grid container spacing={2}>
                    {amenities.map((item) => (
                        <Grid item key={item.id} md={3}>
                            <Card
                                sx={{
                                    maxWidth: 240,
                                    minWidth: 220,
                                }}
                            >
                                <Stack direction={'row'}>
                                    <Box component="div" sx={{ maxWidth: 100 }}>
                                        <CardMedia
                                            component="img"
                                            alt=""
                                            height="100"
                                            width="20"
                                            image={item.image}
                                            title="Image"
                                            style={{
                                                backgroundColor: '#DEDBDB',
                                                position: 'relative',
                                                minWidth: 100,
                                                maxWidth: 100,
                                            }}
                                        />
                                        <Box mt={-6}>
                                            <Controller
                                                control={control}
                                                name={`Amenties.${item.ProductName}`}
                                                defaultValue={false}
                                                render={({ field }) => (
                                                    <Checkbox
                                                        checked={field.value}
                                                        sx={{
                                                            color: red[100],
                                                            '&.Mui-checked': {
                                                                color: red[500],
                                                            },
                                                        }}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        padding={2}
                                    >
                                        {item.ProductName}
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Box>
    )
}

export default PropertyAmenties
