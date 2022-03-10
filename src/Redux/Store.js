import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/Auth";
import venuesReducer from "./Reducers/Venues";
import bookingsReducer from "./Reducers/Bookings";

const store = configureStore({
  reducer: { authReducer, venuesReducer, bookingsReducer },
});

export default store;
