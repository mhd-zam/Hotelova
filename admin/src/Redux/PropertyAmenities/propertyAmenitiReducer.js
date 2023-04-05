import { Add_Property_Aminities, Remove_Property_Aminities } from "./propertyAmenitiType"

const initialstate = {
    PropertyAmenities:[]
}

const propertyAmenitiReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Add_Property_Aminities: return {
            PropertyAmenities:action.data
        }
        case Remove_Property_Aminities: return {
            PropertyAmenities:state['PropertyAmenities'].filter(item=> item._id!==action.id)
        }

        default : return state
    }
}

export default propertyAmenitiReducer