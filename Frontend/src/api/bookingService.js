  import api from "./api";

  const bookingService = {
    // Create Booking
    createBooking: async (bookingData) => {
      const response = await api.post("/bookings", bookingData);
      return response.data;
    },

    // Logged in user's bookings
    getMyBookings: async () => {
      const response = await api.get("/bookings/my");
      return response.data;
    },

    // Booking Details
    getBookingById: async (id) => {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    },

    // Cancel Booking
    cancelBooking: async (id) => {
      const response = await api.patch(`/bookings/${id}/cancel`);
      return response.data;
    },
  };

  export default bookingService;