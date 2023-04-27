import {
    Add_All_Wishlist,
    Add_To_Wishlist,
    Remove_From_Whislist,
    Remove_wishlist,
} from './wishlistType'

const initialstate = {
    wishlistArray: [],
}

export default function wishlistReducer(state = initialstate, action) {
    switch (action.type) {
        case Add_To_Wishlist:
            if (
                state.wishlistArray.find(
                    (item) => item._id === action.payload._id
                )
            ) {
                return state
            }
            return { wishlistArray: [...state.wishlistArray, action.payload] }

        case Remove_From_Whislist:
            return {
                wishlistArray: state.wishlistArray.filter(
                    (item) => item._id !== action.payload
                ),
            }
        case Add_All_Wishlist:
            return {
                wishlistArray: action.payload,
            }
        case Remove_wishlist:
            return {
                wishlistArray: [],
            }
        default:
            return state
    }
}
