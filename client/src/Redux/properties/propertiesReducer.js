import { Add_Properties, Remove_Properties } from './propertiesType'

const initialstate = {
    propertyArray:[]
}

function propertyReducer(state=initialstate,action) {
    switch (action.type) {
    case Add_Properties: return {
        propertyArray:action.payload
    }
    case Remove_Properties: return {
        propertyArray:state.propertyArray.filter(item=>item._id!==action.payload)
    }
    default:return state
    }
}

export default propertyReducer