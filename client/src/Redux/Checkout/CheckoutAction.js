import { TransactionEnded, TransactionStarted } from './CheckoutType'

export function TransactionOpen() {
    return {
        type: TransactionStarted,
    }
}
export function TransactionClose() {
    return {
        type: TransactionEnded,
    }
}
