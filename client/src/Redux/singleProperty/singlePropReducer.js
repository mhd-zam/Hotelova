import { Add_SingleProp } from './singlePropType'

const initialstate = {
    SingleProperty: {},
}

export default function singlePropReducer(state = initialstate, action) {
    switch (action.type) {
        case Add_SingleProp:
            return {
                SingleProperty: action.payload,
            }
        default:
            return state
    }
}
