import React, { useContext } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { ExternalContext } from '../context/CustomContext'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
    const { alert, setAlert } = useContext(ExternalContext)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setAlert({ notify: false, message: '' })
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={alert.notify}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={alert.action}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Stack>
    )
}
