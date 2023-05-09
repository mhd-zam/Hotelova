import React, { useContext } from 'react'
import SearchProperty from '../layouts/SearchProperty'
import Somethingwentwrong from './Somethingwentwrong'
import { ExternalContext } from '../context/CustomContext'

function SearchPage() {
    const { ShowErr } = useContext(ExternalContext)

    return ShowErr ? <Somethingwentwrong /> : <SearchProperty />
}

export default SearchPage
