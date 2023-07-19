import React, { useContext } from 'react'
import { ExternalContext } from '../context/CustomContext'
import Home from '../layouts/Home'
import Somethingwentwrong from './Somethingwentwrong'

function HomePage() {
    const { ShowErr } = useContext(ExternalContext)

    return ShowErr ? <Somethingwentwrong /> : <Home />
}
export default HomePage
