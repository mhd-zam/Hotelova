import { hostApplied, Logout, setCheckuser, setHost, setUser } from './userType'
export function setUserDetails(userDetail) {
    return {
        type: setUser,
        payload: userDetail,
    }
}

export function setCheckUser(bool) {
    return {
        type: setCheckuser,
        payload: bool,
    }
}

export function sethost() {
    return {
        type: setHost,
    }
}

export function logout() {
    return {
        type: Logout,
    }
}

export function hostRequest() {
    return {
        type: hostApplied,
    }
}
