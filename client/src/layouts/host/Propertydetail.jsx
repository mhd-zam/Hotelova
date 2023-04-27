/* eslint-disable */
import React from 'react'
import { TextField, Stack, Typography, Box } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

function Propertydetail() {
    const { control, formState } = useFormContext()
    const { errors } = formState

    console.log(errors)

    return (
        <Stack
            direction={'column'}
            minHeight={'50vh'}
            sx={{
                '& .MuiTextField-root': { m: 2, width: '100%' },
            }}
        >
            <Typography variant="h4" m={2} maxWidth={350}>
                Add short description about your place
            </Typography>
            <Controller
                control={control}
                name="PropertyName"
                rules={{ required: true, pattern: /^[^\s]+(?:$|.*[^\s]+$)/ }}
                render={({ field }) => (
                    <TextField
                        id="outlined-basic"
                        label="Property Name"
                        variant="outlined"
                        error={Boolean(errors.PropertyName)}
                        helperText={
                            errors.PropertyName && 'Property name is required'
                        }
                        {...field}
                    />
                )}
            />

            <Controller
                control={control}
                name="Description"
                rules={{ required: true, pattern: /[^\s\\]/ }}
                render={({ field }) => (
                    <TextField
                        id="outlined-multiline-static"
                        label="Description for property"
                        multiline
                        rows={4}
                        error={Boolean(errors.Description)}
                        helperText={
                            errors.Description &&
                            'Description for property is required'
                        }
                        {...field}
                    />
                )}
            />
        </Stack>
    )
}

export default Propertydetail
