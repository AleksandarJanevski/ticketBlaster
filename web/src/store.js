import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { idReducer } from "./redux/reducers/idReducer";
import { eventsReducer } from "./redux/reducers/eventsReducer";

const getId = {
    idReducer: idReducer,
    eventsReducer: eventsReducer
}

export default configureStore({
    reducer: getId,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})