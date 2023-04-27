import { Add_Destination, Add_checkin, Add_checkout } from './searchType'

export function addDestination(destination) {
    return {
        type: Add_Destination,
        payload: destination,
    }
}

export function addCheckin(date) {
    return {
        type: Add_checkin,
        payload: date,
    }
}

export function addCheckout(date) {
    return {
        type: Add_checkout,
        payload: date,
    }
}
