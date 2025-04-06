import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import bookingReducer from "./reducers/bookings.reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  booking: bookingReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
