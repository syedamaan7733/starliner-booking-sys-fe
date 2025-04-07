import { bookingApi } from "@/services/booking.service";
import {
  ADD_PASSANGER_DETAIL,
  ADD_TRAIN_DATA,
  BOOK_TICKET_FAILURE,
  BOOK_TICKET_REQUEST,
  BOOK_TICKET_SUCCESS,
  CANCEL_TICKET_FAILURE,
  CANCEL_TICKET_REQUEST,
  CANCEL_TICKET_SUCCESS,
  FETCH_ALL_SEATS_FAILURE,
  FETCH_ALL_SEATS_REQUEST,
  FETCH_ALL_SEATS_SUCCESS,
  FETCH_ALL_TRAIN_FAILURE,
  FETCH_ALL_TRAIN_REQUEST,
  FETCH_ALL_TRAIN_SUCCESS,
  FETCH_SEATS_FAILURE,
  FETCH_SEATS_REQUEST,
  FETCH_SEATS_SUCCESS,
  FETCH_USER_BOOKINGS_FAILURE,
  FETCH_USER_BOOKINGS_REQUEST,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  GET_TICKET_DETAIL,
  RESET_SEATS_FAILURE,
  RESET_SEATS_REQUEST,
  RESET_SEATS_SUCCESS,
} from "./actionsType";

export const fetchAllSeats = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_SEATS_REQUEST });

    try {
      const seatsData = await bookingApi.getAllSeats();
      // console.log(seatsData, "from action");

      dispatch({
        type: FETCH_ALL_SEATS_SUCCESS,
        payload: seatsData.seats,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALL_SEATS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchAvailableSeats = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SEATS_REQUEST });

    try {
      const seatsData = await bookingApi.getAvailableSeats();
      // console.log(seatsData, "from avail seat");

      dispatch({
        type: FETCH_SEATS_SUCCESS,
        payload: seatsData.availableSeats,
      });
    } catch (error) {
      dispatch({
        type: FETCH_SEATS_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Book a ticket
export const bookTicket = (passengerData) => {
  return async (dispatch) => {
    dispatch({ type: BOOK_TICKET_REQUEST });
    // console.log(passengerData);

    try {
      const bookingData = await bookingApi.createBooking(passengerData);
      dispatch({
        type: BOOK_TICKET_SUCCESS,
        payload: bookingData,
      });

      // Refresh available seats after booking
      dispatch(fetchAllSeats());

      return bookingData;
    } catch (error) {
      console.log(error?.response.data.message);

      dispatch({
        type: BOOK_TICKET_FAILURE,
        payload: error?.response.data.message || error.message,
      });
      throw error;
    }
  };
};

// Cancel a ticket
export const cancelTicket = (bookingId) => {
  return async (dispatch) => {
    dispatch({ type: CANCEL_TICKET_REQUEST });

    try {
      const cancellationData = await cancelBooking(bookingId);
      dispatch({
        type: CANCEL_TICKET_SUCCESS,
        payload: { bookingId },
      });

      // Refresh available seats after cancellation
      dispatch(fetchSeats());

      return cancellationData;
    } catch (error) {
      dispatch({
        type: CANCEL_TICKET_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};

// Fetch user bookings
export const fetchUserBookings = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_BOOKINGS_REQUEST });

    try {
      const bookingsData = await bookingApi.getUserBookings();
      console.log(bookingsData);
      dispatch({
        type: FETCH_USER_BOOKINGS_SUCCESS,
        payload: bookingsData.userBooking,
      });
      return bookingsData;
    } catch (error) {
      dispatch({
        type: FETCH_USER_BOOKINGS_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};

// Fetch user details
export const fetchUserDetails = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_DETAILS_REQUEST });

    try {
      const userData = await getUserDetails(userId);
      dispatch({
        type: FETCH_USER_DETAILS_SUCCESS,
        payload: userData,
      });
      return userData;
    } catch (error) {
      dispatch({
        type: FETCH_USER_DETAILS_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};

// Reset all seats (admin function)
export const resetSeats = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_SEATS_REQUEST });

    try {
      const resetData = await resetAllSeats();
      dispatch({
        type: RESET_SEATS_SUCCESS,
        payload: resetData,
      });

      // Refresh available seats after reset
      dispatch(fetchSeats());

      return resetData;
    } catch (error) {
      dispatch({
        type: RESET_SEATS_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };
};

// Get All Train
export const fetchAllTrain = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_TRAIN_REQUEST });

    try {
      const trains = await bookingApi.getAllTrain();
      dispatch({
        type: FETCH_ALL_TRAIN_SUCCESS,
        payload: trains.trains,
      });

      // Refresh available seats after cancellation
      dispatch(fetchAllSeats());

      return trains;
    } catch (error) {
      dispatch({
        type: FETCH_ALL_TRAIN_FAILURE,
        payload: error?.response.data.message || error.message,
      });
      throw error;
    }
  };
};

export const addTrainData = (data) => {
  return {
    type: ADD_TRAIN_DATA,
    payload: data,
  };
};

export const addPassangerDetail = (data) => {
  return {
    type: ADD_PASSANGER_DETAIL,
    payload: data,
  };
};

export const getTicketDetail = (data) => {
  return {
    type: GET_TICKET_DETAIL,
    payload: data,
  };
};
