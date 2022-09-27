import {configureStore} from "@reduxjs/toolkit"
import UserSlise, { userSlice } from "./features/UserSlise"
import appApi from "./Services/appApi"


import storage from "redux-persist/lib/storage"
import  {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'


let reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,
});

let presistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath]
}

let persistedReducer = persistReducer(presistConfig, reducer);

let store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware]
});

export default store;