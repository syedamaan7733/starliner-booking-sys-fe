import { api } from "./index.service";

export const bookingApi = {
  // Get available seats
  getAvailableSeats: async (trainId, date) => {
    const response = await api.get(`/booking/available`, {});
    return response.data;
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    const response = await api.post("/booking/create-book", bookingData);
    // return response.data;
  },

  // Get user's bookings
  getUserBookings: async () => {
    const response = await api.get("/booking/user-get");
    return response.data;
  },

  // Get specific booking details
  getBookingDetails: async (bookingId) => {
    const response = await api.get(`/booking/${bookingId}`);
    return response.data;
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    const response = await api.delete(`/booking/${bookingId}`);
    return response.data;
  },

  // Admin only: Reset available seats
  resetSeats: async (trainId, date) => {
    const response = await api.post("/booking/reset");
    return response.data;
  },
  // Get all seats
  getAllSeats: async () => {
    const response = await api.get("/booking/train/all-seats");
    return response.data;
  },

  getAllTrain: async () => {
    const response = await api.get("/train");
    return response.data;
  },
};
