import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Flag from '../data'
import TextField from '@mui/material/TextField'
import { Stack, Box } from '@mui/system'

function Countryselect({ callback, fieldname }) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '95%' },
            }}
            noValidate
            autoComplete="off"
        >
            {' '}
            <TextField
                id="outlined-select-currency"
                select
                color="success"
                label="Country"
                defaultValue="+91"
                onClick={callback}
                name={fieldname}
            >
                {[
                    Flag.map((option) => (
                        <MenuItem
                            key={option.dial_code}
                            value={option.dial_code}
                        >
                            <Stack direction={'row'} spacing={2}>
                                <img
                                    src={`/asset/png/${option.code}.png`}
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                {option.name + ' ' + option.dial_code}
                            </Stack>
                        </MenuItem>
                    )),
                ]}
            </TextField>
        </Box>
    )
}

export default Countryselect
