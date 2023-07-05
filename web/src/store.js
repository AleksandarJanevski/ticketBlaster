import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { idReducer } from "./redux/reducers/idReducer";
import { eventsReducer } from "./redux/reducers/eventsReducer";
import { userReducer } from "./redux/reducers/userReducer";

const getInfo = {
    idReducer: idReducer,
    eventsReducer: eventsReducer,
    userReducer: userReducer
}

export default configureStore({
    reducer: getInfo,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})