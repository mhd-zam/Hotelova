import { Add_SingleProp } from './singlePropType'

export function addSingleProperty(data) {
    return {
        type: Add_SingleProp,
        payload: data,
    }
}
