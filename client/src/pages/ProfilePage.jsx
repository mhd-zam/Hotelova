import React, { useEffect, useState } from 'react'
import Profile from '../layouts/Profile'
import { useSelector } from 'react-redux'
import { getWalletAmt } from '../api/api'
function ProfilePage() {
    const { username, phonenumber, email, address, _id } = useSelector(
        (state) => state.user.userDetails
    )
    const [wallet, setWallet] = useState(0)
    useEffect(() => {
        getWalletAmt(_id)
            .then(({ data }) => {
                console.log(data)
                setWallet(data.Wallet)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    return (
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
