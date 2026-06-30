import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import bookingReducer from "./slice/bookingSlice";
import uiReducer from "./slice/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    ui: uiReducer,
  },
});

export default store;