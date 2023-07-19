import React, { useState, useRef, useEffect, useContext } from 'react'
import { Box, Typography, TextField, Button, Rating } from '@mui/material'
import { ExternalContext } from '../../context/CustomContext'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Unstable_Grid2'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import { submitComment } from '../../api/api'

function CommentAndRating({ SingleProperty }) {
    const [comments, setComments] = useState(
        SingleProperty['comments'] ? SingleProperty.comments : []
    )
    const [comment, setComment] = useState({})
    const [rating, setRating] = useState(0)
    const commentsEndRef = useRef(null)
    const [shouldScroll, setShouldScroll] = useState(false)
    const { setShowErr } = useContext(ExternalContext)
    let username = useSelector((state) => state.user.userDetails?.username)

    const handleCommentChange = (event) => {
        setComment({ text: event.target.value, rating: 0, name: username })
    }
    useEffect(() => {
        if (shouldScroll && commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [comments])

    const handleCommentSubmit = async () => {
        try {
            await submitComment(comment, SingleProperty._id)
            setComments([...comments, comment])
            console.log(comment)
            console.log(comments)
            setComment({ text: '', rating: 0, name: '' })
            setRating(0)
            setShouldScroll(true)
        } catch (err) {
            console.log(err)
            setShowErr(true)
        }
    }

    const handleRatingChange = (event, value) => {
        setComment({ ...comment, rating: value })
        setRating(value)
    }

    return (
        <div style={{ padding: '16px' }}>
            <Typography variant="h4">Comments and Rating</Typography>
            <Divider />
            <Grid
                container
                spacing={3}
                style={{ marginBottom: '16px', marginTop: '16px' }}
            >
                <Grid item xs={12} md={12}>
                    <TextField
                        id="comment"
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        value={comment.text}
                        onChange={handleCommentChange}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box>
                        <Typography variant="body1">
                            Rate this property:
                        </Typography>
                        <Rating
                            name="rating"
                            value={rating}
                            precision={0.5}
                            onChange={handleRatingChange}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCommentSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
            {comments.map((item, index) => (
                <Box
                    key={index}
                    sx={{ border: 1, borderStyle: 'groove', p: 3 }}
                >
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        sx={{
                            '& > *:not(:last-child)': { marginRight: '8px' },
                        }}
                    >
                        <Avatar sx={{ width: 28, height: 28 }} />
                        <Typography
                            variant="body1"
                            style={{ marginBottom: '16px' }}
                        >
                            {item.name}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body1"
                        style={{ marginBottom: '16px' }}
                    >
                        {item.text}
                    </Typography>
                    <Rating
                        name="rating"
                        value={item.rating}
                        precision={0.5}
                        readOnly
                    />
                </Box>
            ))}
            <Box ref={commentsEndRef} />
        </div>
    )
}

export default CommentAndRating
