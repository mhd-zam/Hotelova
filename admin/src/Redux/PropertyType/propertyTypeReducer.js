import { Add_PropertyType, Remove_PropertyType } from "./propertytypeType"

const initialState = {
    PropertyType:[]
}

const propertyTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Add_PropertyType: return {
            PropertyType:action.data
        }
        case Remove_PropertyType: return {
            PropertyType:state['PropertyType'].filter(item=>item._id!==action.id)
        }
        default: return state
    }
}

export default propertyTypeReducer