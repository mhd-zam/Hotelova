import { combineReducers } from "redux"
import propertyTypeReducer from "./PropertyType/propertyTypeReducer"
import propertyAmenitiReducer from "./PropertyAmenities/propertyAmenitiReducer"

const rootReducer = combineReducers({
    propertyTypeState: propertyTypeReducer,
    propertyAmenitiState:propertyAmenitiReducer
})

export default rootReducer