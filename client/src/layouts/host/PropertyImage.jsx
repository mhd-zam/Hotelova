import React, { useState, useEffect } from 'react'
import { Box, Card, CardMedia, Typography, Grid } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { Stack } from '@mui/system'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useFormContext } from 'react-hook-form'

function Propertyimage({ imgErr }) {
    const { getValues, setValue } = useFormContext()
    const [images, setImages] = useState(getValues('images'))

    useEffect(() => {
        setValue('images', [...images])
    }, [images, setValue])

    function handledrop(e) {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files)
        const imagesOnly = files.filter((file) =>
            file.type.startsWith('image/')
        )

        if (imagesOnly.length === 0) {
            alert('Please drop only image files')
            return
        }

        setImages([...images, ...files])
        setValue([...images, ...files])
    }

    function handleFile(e) {
        const files = Array.from(e.target.files)

        const imagesOnly = files.filter((file) =>
            file.type.startsWith('image/')
        )

        if (imagesOnly.length === 0) {
            alert('Please drop only image files')
            return
        }
        setImages([...images, ...files])
    }

    const removeImage = (IMG) => {
        setImages((prevImages) => prevImages.filter((img) => img !== IMG))
    }

    return (
        <>
            <Box
                component={'div'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                }}
            >
                {imgErr && <Typography>6 Images required</Typography>}
                <Card
                    onDrop={handledrop}
                    onDragOver={(e) => e.preventDefault()}
                    sx={{
                        width: '70%',
                        height: 200,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 5,
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: 'blue',
                        borderRadius: 10,
                        margin: '20px',
                    }}
                >
                    <input
                        id="file-input"
                        style={{ display: 'none' }}
                        type="file"
                        onChange={handleFile}
                        multiple
                        accept="image/*"
                        max="6"
                    />
                    <label htmlFor="file-input">
                        <CloudDownloadIcon
                            sx={{
                                fontSize: 100,
                                color: 'blueviolet',
                                cursor: 'pointer',
                            }}
                        />
                        <Typography variant="h6" textAlign={'center'}>
                            DROP
                        </Typography>
                        <Box
                            component={'div'}
                            sx={{
                                width: 100,
                                height: 40,
                                bgcolor: 'aqua',
                                boxShadow: 1,
                                borderRadius: 2,
                                textAlign: 'center',
                                padding: 1,
                                cursor: 'pointer',
                            }}
                            variant="contained"
                        >
                            upload
                        </Box>
                    </label>
                </Card>
                <Stack direction={'row'} spacing={2}>
                    <Grid container>
                        {images.map((url, index) => (
                            <Grid key={index} item md={2}>
                                <Box
                                    display="flex"
                                    flexDirection={'column'}
                                    sx={{
                                        maxWidth: '650px',
                                        flex: '1 1 0%',
                                        margin: '10px',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    <HighlightOffIcon
                                        sx={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            color: 'white',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => removeImage(url)}
                                    />
                                    <CardMedia
                                        component="img"
                                        alt=""
                                        src={
                                            typeof url === 'string'
                                                ? url
                                                : URL.createObjectURL(url)
                                        }
                                        title="Image"
                                        sx={{ width: '100%', height: 'auto' }}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Box>
        </>
    )
}

export default Propertyimage
