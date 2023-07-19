import React, { useContext } from 'react'
import HostApplyPage from '../layouts/host/HostApplyPage'
import { ExternalContext } from '../context/CustomContext'
import Somethingwentwrong from './Somethingwentwrong'

function HostDetailPage() {
    const { ShowErr } = useContext(ExternalContext)

    return ShowErr ? <Somethingwentwrong /> : <HostApplyPage />
}

export default HostDetailPage
