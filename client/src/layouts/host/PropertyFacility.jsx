import React from 'react'
import { TextField, Box, Typography, Stack, Grid,styled } from '@mui/material'
import { useFormContext, Controller} from 'react-hook-form'


const Btn = styled('div')({
    width: 40,
    height: 40,
    backgroundColor: 'red',
    textAlign: 'center',
    paddingTop: 8,
    borderRadius: 10,
    cursor:'pointer'
})



function PropertyFacility() {

    const { control,getValues,setValue } = useFormContext()

    let state = [
        { Id: 1, Type: 'Bedrooms'},
        { Id: 2, Type: 'Bathrooms'},
        { Id: 3, Type: 'Kitchen'},
        { Id: 4, Type: 'Balcony'},
    ]

    
    function Decrement(name) {
        let value = getValues(`Facility.${name}`)
        if (value > 1) {
            setValue(`Facility.${name}`, value-1)
        }
    }
    function Increment(name) {
        let value = getValues(`Facility.${name}`)
        setValue(`Facility.${name}`, value+1)
    }

    return (
        <Box minHeight={'50vh'} mt={5} >
            <Typography variant="h4" maxWidth={350} ml={5}>
            Add facilities available at your place.
            </Typography>
            <Stack  direction={'row'} p={4} spacing={2}>
                <Grid container spacing={2}>
                    {state.map((item) => (
                        <Grid key={item.Type} item md={3}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">{item.Type}</Typography>
                                <Box
                                    component={'div'}
                                    sx={{ display: 'flex', flexDirection: 'row' }}
                                >
                                    
                                    <Controller control={control}  name={`Facility.${item.Type}`} render={({ field }) => (
                                        <>   
                                            <Btn onClick={()=>{Decrement(item.Type)}} >-</Btn>
                                            <TextField
                                                id="outlined-required"
                                                type='text'
                                                sx={{ width: 40 }}
                                                size="small"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                {...field} 
                                            />
                                            <Btn onClick={()=>{Increment(item.Type)}} >+</Btn>
                                        </>
                                    )}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Box>
    )
}

export default PropertyFacility
