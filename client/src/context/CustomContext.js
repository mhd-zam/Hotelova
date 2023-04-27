import React, { createContext, useState } from 'react'
export const ExternalContext = createContext()

function CustomContext({ children }) {
    const [isfilled, setIsfilled] = useState(false) //to know the status and change from login to otp
    const [open, setOpen] = useState(false) //to open and close modal
    const [openLogin, setOpenlogin] = useState(false) //to open the modal onclick login button
    const [alert, setAlert] = useState({
        notify: false,
        message: '',
        action: '',
    }) // for alerting the user
    const [userDetails, setuserDetails] = useState({
        phonenumber: '',
        email: '',
        countrycode: '+91',
        _id: '',
    })
    const [propertyEdit, setPropertyEdit] = useState(null)

    return (
        <ExternalContext.Provider
            value={{
                isfilled,
                setIsfilled,
                open,
                setOpen,
                alert,
                setAlert,
                openLogin,
                setOpenlogin,
                userDetails,
                setuserDetails,
                propertyEdit,
                setPropertyEdit,
            }}
        >
            {children}
        </ExternalContext.Provider>
    )
}

export default CustomContext
