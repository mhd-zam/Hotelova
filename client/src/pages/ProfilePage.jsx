import React, { useContext, useEffect, useState } from 'react'
import Profile from '../layouts/Profile'
import { useSelector } from 'react-redux'
import { getWalletAmt } from '../api/api'
import { ExternalContext } from '../context/CustomContext'
import Somethingwentwrong from './Somethingwentwrong'
function ProfilePage() {
    const { username, phonenumber, email, address, _id } = useSelector(
        (state) => state.user.userDetails
    )
    const { setShowErr, ShowErr } = useContext(ExternalContext)
    const [wallet, setWallet] = useState(0)
    useEffect(() => {
        getWalletAmt(_id)
            .then(({ data }) => {
                console.log(data)
                setWallet(data.Wallet)
            })
            .catch(() => {
                setShowErr(true)
            })
    }, [])

    return ShowErr ? (
        <Somethingwentwrong />
    ) : (
        <Profile
            name={username}
            phoneNumber={phonenumber}
            email={email}
            Address={address}
            wallet={wallet}
        />
    )
}

export default ProfilePage
