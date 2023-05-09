import React, { useContext } from 'react'
import { ExternalContext } from '../context/CustomContext'
import SinglePropertyPage from '../layouts/PropertyDetail/SinglePropertyPage'
import Somethingwentwrong from './Somethingwentwrong'
export default function PropertyDetail() {
    const { ShowErr } = useContext(ExternalContext)

    return ShowErr ? <Somethingwentwrong /> : <SinglePropertyPage />
}
