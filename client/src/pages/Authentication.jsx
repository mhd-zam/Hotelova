import React, { useContext } from 'react'
import { ExternalContext } from '../context/CustomContext'
import Form from '../layouts/userAuth/Loginform'
import Otpform from '../layouts/userAuth/Otpform'

function Authentication() {
    const { isfilled } = useContext(ExternalContext)
    return <>{isfilled ? <Otpform /> : <Form />}</>
}

export default Authentication
