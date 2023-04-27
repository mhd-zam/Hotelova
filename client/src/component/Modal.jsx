import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { ExternalContext } from '../context/CustomContext'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function CustomizedDialogs(props) {
    const { title, children, status, callback, modaloffbtn } = props
    const { open, setOpen } = useContext(ExternalContext)

    useEffect(() => {
        setOpen(status)
    }, [])

    function handleClose() {
        setOpen(false)
        callback(false)
    }
    return (
        <div style={{ position: 'fixed' }}>
            <Button></Button>
            <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 8,
                        width: '100%',
                    },
                }}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                {' '}
                <DialogTitle
                    style={{ textAlign: 'center' }}
                    sx={{ m: 0, p: 2 }}
                >
                    {title}
                    {modaloffbtn ? null : (
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                left: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
            </Dialog>
        </div>
    )
}
