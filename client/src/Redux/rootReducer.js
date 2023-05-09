import { combineReducers } from 'redux'
import propertyReducer from './properties/propertiesReducer'
import userReducer from './user/userReducer'
import singlePropReducer from './singleProperty/singlePropReducer'
import searchReducer from './search/searchReducer'
import wishlistReducer from './wishlist/wishlistReducer'
import checkoutReducer from './Checkout/CheckoutReducer'

const rootReducer = combineReducers({
    user: userReducer,
    properties: propertyReducer,
    SingleProp: singlePropReducer,
    search: searchReducer,
    wishlist: wishlistReducer,
    userCheckout: checkoutReducer,
})

export default rootReducer
