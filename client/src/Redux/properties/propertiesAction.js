import {
    Add_Properties,
    Add_favourite,
    Back_toInitial,
    Remove_Properties,
} from './propertiesType'

export function AddProperties(data) {
    return {
        type: Add_Properties,
        payload: data,
    }
}

export function RemoveProperties(id) {
    return {
        type: Remove_Properties,
        payload: id,
    }
}

export function addfavourite(id) {
    return {
        type: Add_favourite,
        payload: id,
    }
}

export function toInitialState() {
    return {
        type: Back_toInitial,
    }
}
