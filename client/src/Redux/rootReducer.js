import { combineReducers } from 'redux'
import propertyReducer from './properties/propertiesReducer'
import userReducer from './user/userReducer'
import singlePropReducer from './singleProperty/singlePropReducer'

const rootReducer = combineReducers({
    user: userReducer,
    properties: propertyReducer,
    SingleProp:singlePropReducer
})

export default rootReducer