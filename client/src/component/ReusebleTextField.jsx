import React from 'react'
import { TextField } from '@mui/material'

export default function ReusableTextField(props) {
    const { label, variant, error, helperText, ...rest } = props
    return (
        <TextField
            {...rest}
            label={label}
            variant={variant}
            error={!!error}
            helperText={error ? helperText : ''}
            fullWidth
        />
    )
}
