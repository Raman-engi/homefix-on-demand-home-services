import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import bookingReducer from "./slice/bookingSlice";
import servicesReducer from "./slice/servicesSlice";
import uiReducer from "./slice/uiSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer, // <-- bookings se booking
    services: servicesReducer,
    ui: uiReducer,
    users: userReducer,
  },
});

export default store;