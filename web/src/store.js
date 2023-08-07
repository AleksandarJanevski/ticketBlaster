import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { eventsReducer } from "./redux/reducers/eventsReducer";
import { userReducer } from "./redux/reducers/userReducer";
import { printReducer } from "./redux/reducers/printReducer";

const getInfo = {
  eventsReducer: eventsReducer,
  userReducer: userReducer,
  printReducer: printReducer,
};

export default configureStore({
  reducer: getInfo,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
