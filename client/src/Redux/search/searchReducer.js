import { Add_Destination, Add_checkin, Add_checkout } from './searchType'

const initialstate = {
    destination: '',
    checkin: '',
    checkout: '',
}

export default function searchReducer(state = initialstate, action) {
    switch (action.type) {
        case Add_Destination:
            return {
                ...state,
                destination: action.payload,
            }
        case Add_checkin:
            return {
                ...state,
                checkin: action.payload,
            }
        case Add_checkout:
            return {
                ...state,
                checkout: action.payload,
            }
        default:
            return state
    }
}
