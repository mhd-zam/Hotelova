import React, { useContext } from 'react'
import { ExternalContext } from '../context/CustomContext'
import ChatLayout from '../layouts/Chat/ChatLayout'
import Somethingwentwrong from './Somethingwentwrong'

function Chat() {
    const { ShowErr } = useContext(ExternalContext)
    return ShowErr?<Somethingwentwrong />:<ChatLayout />
}

export default Chat
