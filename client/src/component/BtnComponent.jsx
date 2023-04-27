import React from 'react'
import Button from '@mui/material/Button'

function BtnComponent({
    variant,
    content,
    icon,
    callback,
    id,
    style,
    disable,
    type,
    loading,
    endIcon,
}) {
    return (
        <Button
            startIcon={icon}
            endIcon={endIcon}
            id={id}
            loading={loading}
            type={type}
            onClick={callback}
            disabled={disable}
            sx={style}
            variant={variant}
        >
            {content}
        </Button>
    )
}

export default BtnComponent
