import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function BasicPagination({ count, callback }) {
    return (
        <Stack
            alignItems="center"
            marginTop={5}
            justifyContent="center"
            spacing={2}
        >
            <Pagination count={count} onChange={callback} color="primary" />
        </Stack>
    )
}
