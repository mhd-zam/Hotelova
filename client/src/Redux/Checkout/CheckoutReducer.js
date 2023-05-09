import { TransactionEnded, TransactionStarted } from './CheckoutType'

const initialstate = false

export default function checkoutReducer(state = initialstate, action) {
    switch (action.type) {
        case TransactionStarted:
            return (state = true)
        case TransactionEnded:
            return (state = false)
        default:
            return state
    }
}
