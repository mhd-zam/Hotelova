import {
    Add_All_Wishlist,
    Add_To_Wishlist,
    Remove_From_Whislist,
    Remove_wishlist,
} from './wishlistType'

export function addtowishlist(item) {
    return {
        type: Add_To_Wishlist,
        payload: item,
    }
}

export function removefromwishlist(id) {
    return {
        type: Remove_From_Whislist,
        payload: id,
    }
}

export function addallwishlist(item) {
    return {
        type: Add_All_Wishlist,
        payload: item,
    }
}

export function logoutWishlist() {
    return {
        type: Remove_wishlist,
    }
}
