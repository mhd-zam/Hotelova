import { Add_Property_Aminities, Remove_Property_Aminities } from "./propertyAmenitiType"

export const addPropertyAmenities = (propertyAmenitiType) => {
    return {
        type:Add_Property_Aminities,
        data:propertyAmenitiType
    }
}


export const removePropertyAmenities = (id) => {
    return {
        type: Remove_Property_Aminities,
        id:id
    }
}