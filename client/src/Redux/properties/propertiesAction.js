import { Add_Properties, Remove_Properties } from './propertiesType'


export function AddProperties(data) {
    return {
        type: Add_Properties,
        payload:data
    }
}

export function RemoveProperties(id) {
    return {
        type: Remove_Properties,
        payload:id
    }
}