import {
    Add_Properties,
    Add_favourite,
    Back_toInitial,
    Remove_Properties,
} from './propertiesType'

const initialstate = {
    propertyArray: [],
}

function propertyReducer(state = initialstate, action) {
    switch (action.type) {
        case Add_Properties:
            return {
                propertyArray: [
                    ...state.propertyArray,
                    ...(action.payload ?? []),
                ],
            }
        case Remove_Properties:
            return {
                propertyArray: state.propertyArray.filter(
                    (item) => item._id !== action.payload
                ),
            }
        case Add_favourite:
            return {
                propertyArray: state.propertyArray.map((item) => {
                    if (item._id === action.payload) {
                        item.wishlist = !item.wishlist
                    }
                    return item
                }),
            }

        case Back_toInitial:
            return {
                propertyArray: [],
            }

        default:
            return state
    }
}

export default propertyReducer
