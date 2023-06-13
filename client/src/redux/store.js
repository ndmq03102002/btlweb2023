import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

const rootSlice = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootSlice,
});

export default store;
