import React from 'react'
import { Box, Avatar, Typography, Divider } from '@mui/material'

function ChatUser({ data, currentchat }) {
    const selected = data.conversationid === currentchat

    function stringToColor(string) {
        let hash = 0
        let i

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }
        i

        let color = '#'

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        /* eslint-enable no-bitwise */

        return color
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split('')[0][0]}${name.split('')[1][0]}`,
        }
    }
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'start',
                    borderRadius: 2,
                    pl: 5,
                    bgcolor: selected ? '#e0e0e0' : '#f5f5f5',
                    cursor: 'pointer',
                }}
            >
                <Avatar {...stringAvatar(data.receiverName)} />
                <Box display={'flex'} width={'80%'} flexDirection={'row'}>
                    <Box flexGrow={1}>
                        <Typography
                            p={1}
                            color={'#3b71ca'}
                            fontWeight={600}
                            variant="inherit"
                        >
                            {data.receiverName}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider />
        </>
    )
}

export default ChatUser
