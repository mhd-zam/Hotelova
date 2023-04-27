import * as React from 'react'
import TextField from '@mui/material/TextField'

export default function BasicTextFields({
    placeholder,
    callback,
    state,
    error,
    defaultvalue,
}) {
    return (
        <TextField
            {...error}
            id="outlined-required"
            name={placeholder}
            label={placeholder}
            onChange={callback}
            value={state}
            defaultValue={defaultvalue}
        />
    )
}
