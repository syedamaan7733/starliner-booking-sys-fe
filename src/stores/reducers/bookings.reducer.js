import {
  FETCH_SEATS_REQUEST,
  FETCH_SEATS_SUCCESS,
  FETCH_SEATS_FAILURE,
  BOOK_TICKET_REQUEST,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAILURE,
  CANCEL_TICKET_REQUEST,
  CANCEL_TICKET_SUCCESS,
  CANCEL_TICKET_FAILURE,
  FETCH_USER_BOOKINGS_REQUEST,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAILURE,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  RESET_SEATS_REQUEST,
  RESET_SEATS_SUCCESS,
  RESET_SEATS_FAILURE,
  FETCH_ALL_SEATS_SUCCESS,
  FETCH_ALL_SEATS_FAILURE,
  ADD_TRAIN_DATA,
  ADD_PASSANGER_DETAIL,
  FETCH_ALL_TRAIN_REQUEST,
  FETCH_ALL_TRAIN_SUCCESS,
  GET_TICKET_DETAIL,
} from "../actions/actionsType";

const initialState = {
  // Seats data
  seats: Array(80)
    .fill()
    .map((_, index) => ({
      seatNumber: index + 1,
      isBooked: false,
      passengerName: null,
    })),
  totalSeats: 80,
  availableSeats: 80,
  trains: [],
  train: {},

  // User data
  passangerDetails: [],
  userBookings: [],
  userDetails: {},
  newTicket: {},

  // Loading states
  loading: {
    seats: false,
    booking: false,
    cancellation: false,
    userBookings: false,
    userDetails: false,
    resetSeats: false,
    trains: false,
  },

  // Error states
  errors: {
    seats: null,
    booking: null,
    cancellation: null,
    userBookings: null,
    userDetails: null,
    resetSeats: null,
    trains: null,
  },
};

const bookingReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    // Fetch All Seats
    case FETCH_SEATS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, seats: true },
        error: { ...state.errors, seats: null },
      };

    case FETCH_ALL_SEATS_SUCCESS:
      return {
        ...state,
        seats: action.payload,
        loading: { ...state.loading, seats: false },
      };

    case FETCH_ALL_SEATS_FAILURE: {
      return {
        ...state,
        loading: { ...state.loading, seats: false },
        error: { ...state.errors, error: action.payload },
      };
    }
    // Fetch All Trains
    case FETCH_ALL_TRAIN_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, trains: true },
        error: { ...state.errors, trains: null },
      };

    case FETCH_ALL_TRAIN_SUCCESS:
      return {
        ...state,
        trains: [...action.payload],
        loading: { ...state.loading, trains: false },
      };

    case FETCH_ALL_SEATS_FAILURE: {
      return {
        ...state,
        loading: { ...state.loading, trains: false },
        errors: { ...state.errors, trains: action.payload },
      };
    }
    // Fetch Seats
    case FETCH_SEATS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, seats: true },
        errors: { ...state.errors, seats: null },
      };

    case FETCH_SEATS_SUCCESS:
      return {
        ...state,
        // seats: action.payload.seats,
        availableSeats: action.payload,
        loading: { ...state.loading, seats: false },
      };

    case FETCH_SEATS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, seats: false },
        errors: { ...state.errors, seats: action.payload },
      };

    // Book Ticket
    case BOOK_TICKET_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, booking: true },
        errors: { ...state.errors, booking: null },
      };

    case BOOK_TICKET_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        newTicket: { ...action.payload },
        passangerDetails: [],
        loading: { ...state.loading, booking: false },
      };

    case BOOK_TICKET_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, booking: false },
        errors: { ...state.errors, booking: action.payload },
      };

    // Cancel Ticket
    case CANCEL_TICKET_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, cancellation: true },
        errors: { ...state.errors, cancellation: null },
      };

    case CANCEL_TICKET_SUCCESS:
      // Filter out the cancelled booking from userBookings if it exists
      return {
        ...state,
        userBookings: state.userBookings.filter(
          (booking) => booking.id !== action.payload.bookingId
        ),
        loading: { ...state.loading, cancellation: false },
      };

    case CANCEL_TICKET_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, cancellation: false },
        errors: { ...state.errors, cancellation: action.payload },
      };

    // Fetch User Bookings
    case FETCH_USER_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, userBookings: true },
        errors: { ...state.errors, userBookings: null },
      };

    case FETCH_USER_BOOKINGS_SUCCESS:
      return {
        ...state,
        userBookings: action.payload,
        loading: { ...state.loading, userBookings: false },
      };

    case FETCH_USER_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, userBookings: false },
        errors: { ...state.errors, userBookings: action.payload },
      };

    // Fetch User Details
    case FETCH_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, userDetails: true },
        errors: { ...state.errors, userDetails: null },
      };

    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        loading: { ...state.loading, userDetails: false },
      };

    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, userDetails: false },
        errors: { ...state.errors, userDetails: action.payload },
      };

    // Reset Seats
    case RESET_SEATS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, resetSeats: true },
        errors: { ...state.errors, resetSeats: null },
      };

    case RESET_SEATS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, resetSeats: false },
      };

    case RESET_SEATS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, resetSeats: false },
        errors: { ...state.errors, resetSeats: action.payload },
      };
    // ADding the train Data
    case ADD_TRAIN_DATA: {
      return {
        ...state,
        train: { ...action.payload },
      };
    }

    // Adding the Passanget Info
    case ADD_PASSANGER_DETAIL: {
      return {
        ...state,
        passangerDetails: [...action.payload],
      };
    }

    // Getting Tickets Details
    case GET_TICKET_DETAIL: {
      return {
        ...state,
        userDetails: { ...action.payload },
      };
    }

    default:
      return state;
  }
};

export default bookingReducer;
