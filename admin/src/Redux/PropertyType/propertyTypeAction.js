import { Add_PropertyType, Remove_PropertyType } from "./propertytypeType"

export const removePropertyType = (id) => {
    return {
        type: Remove_PropertyType,
        id:id
    }
}

export const addPropertyType = (PropertyType) => {
    return {
        type: Add_PropertyType,
        data:PropertyType
    }
}

