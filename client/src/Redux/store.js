import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'

const persistConfig = {
    key: 'root',
    storage,
}

const persistreducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistreducer, composeWithDevTools())

const persistor = persistStore(store)

export default store
export { persistor }
