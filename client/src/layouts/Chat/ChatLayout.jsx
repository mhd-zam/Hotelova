import React, { useEffect, useRef, useState, useContext } from 'react'
import {
    Container,
    Card,
    Grid,
    Box,
    TextField,
    Button,
    Stack,
    Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Message from './Message'
import ChatUser from './ChatUser'
import { getconversation } from '../../api/api'
import { useSelector } from 'react-redux'
import { getMessages } from '../../api/api'
import { postMessage } from '../../api/api'
import { io } from 'socket.io-client'
import { ExternalContext } from '../../context/CustomContext'
export default function ChatLayout() {
    const [chatData, setChatData] = useState([])
    const [currentchat, setCurrentChat] = useState()
    const [messages, setMessages] = useState([])
    const [NewMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [receiver, setReceiver] = useState('')
    const userid = useSelector((state) => state.user.userDetails._id)
    const user = useSelector((state) => state.user.userDetails)
    const socket = useRef()
    const chatRef = useRef()
    const { setShowErr } = useContext(ExternalContext)

    useEffect(() => {
        socket.current = io('https://hotelova.site',{path:'/server/socket.io'})
    }, [])

    useEffect(() => {
        arrivalMessage &&
            checkcurrentChat(arrivalMessage.senderid) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, chatData])

    useEffect(() => {
        socket.current?.emit('adduser', userid)
        socket.current?.on('getuser', (users) => {
            console.log(users)
        })
    }, [userid])

    useEffect(() => {
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                senderid: data.senderid,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    useEffect(() => {
        const getchatuser = async () => {
            try {
                const { data } = await getconversation(userid)
                setChatData(data)
            } catch (err) {
                setShowErr(true)
            }
        }
        getchatuser()
    }, [userid])

    useEffect(() => {
        const getCurrentMessage = async () => {
            try {
                const { data } = await getMessages(currentchat)
                setMessages(data)
            } catch (err) {
                setShowErr(true)
            }
        }
        if (currentchat) {
            getCurrentMessage()
        }
    }, [currentchat])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    function checkcurrentChat(senderid) {
        if (currentchat) {
            const data = chatData.find(
                (item) => item.conversationid === currentchat
            )
            return data.receiverid === senderid
        }
        return null
    }

    function getReceiverid() {
        if (currentchat) {
            const data = chatData.find(
                (item) => item.conversationid === currentchat
            )
            return data.receiverid
        }
        return false
    }

    const handlesubmit = () => {
        const message = {
            conversationid: currentchat,
            senderid: userid,
            text: NewMessage,
        }

        socket.current.emit('sendMessage', {
            senderid: userid,
            receiverid: getReceiverid(),
            text: NewMessage,
        })

        postMessage(message)
            .then(({ data }) => {
                setMessages([...messages, data])
                setNewMessage('')
            })
            .catch(() => {
                setShowErr(true)
            })
    }

    function handlefield(e) {
        setNewMessage(e.target.value)
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                width: '95%',
                overflow: 'hidden',
                overflowX: 'hidden',
                overflowY: 'hidden',
            }}
        >
            <Card
                sx={{
                    bgcolor: 'whitesmoke',
                    width: '100%',
                    mt: 4,
                    height: 'auto',
                    boxShadow: 5,
                }}
            >
                <Grid container>
                    <Grid item xs={12} sm={12} lg={4}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '70vh',
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                padding: 1,
                                scrollbarWidth: 'thin',
                                bgcolor: 'white',
                                '&::-webkit-scrollbar': {
                                    width: '10px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'gray',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    background: 'darkgray',
                                },
                            }}
                        >
                            {chatData
                                ? chatData.map((item, index) => (
                                      <Box
                                          component={'div'}
                                          onClick={() => {
                                              setCurrentChat(
                                                  item.conversationid
                                              )
                                              setReceiver(item)
                                          }}
                                          key={index}
                                      >
                                          <ChatUser
                                              data={item}
                                              currentchat={currentchat}
                                          />
                                      </Box>
                                  ))
                                : null}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={8}>
                        {currentchat ? (
                            <>
                                <Box
                                    sx={{
                                        height: '70vh',
                                        width: '100%',
                                        bgcolor: '#ccd5cc',
                                        overflowX: 'hidden',
                                        padding: 5,
                                        overflowY: 'auto',
                                        scrollbarWidth: 'thin',
                                        scrollBehavior: 'smooth',
                                        '&::-webkit-scrollbar': {
                                            width: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: 'gray',
                                            borderRadius: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: 'darkgray',
                                        },
                                    }}
                                >
                                    {messages.map((item, index) => (
                                        <div
                                            ref={chatRef}
                                            id="scroll"
                                            key={index}
                                        >
                                            <Message
                                                data={item}
                                                userid={userid}
                                                receiver={receiver}
                                                user={user}
                                            />
                                        </div>
                                    ))}
                                </Box>
                                <Stack direction={'row'}>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        maxRows={4}
                                        fullWidth
                                        size="small"
                                        value={NewMessage}
                                        onChange={handlefield}
                                    />
                                    <Button
                                        disabled={!NewMessage}
                                        variant="contained"
                                        sx={{ bgcolor: '#3b71ca' }}
                                        endIcon={<SendIcon />}
                                        onClick={handlesubmit}
                                    ></Button>
                                </Stack>
                            </>
                        ) : (
                            <Box
                                height={'60vh'}
                                textAlign={'center'}
                                pt={'30vh'}
                                width={'100%'}
                            >
                                <Typography variant="h4" color={'#D3D3D3'}>
                                    start a chat now
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}
