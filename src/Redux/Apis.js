import axios from "axios";

const API = axios.create({ baseURL: "https://venue-booking-app-smoky.vercel.app" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// Authentication API
export const login = (postData) => API.post("./user/login", postData);
export const logOut = () => API.post("./user/logout");
export const SignUp = (postData) => API.post("./user/signup", postData);

//Venues API
export const getAllVenues = () => API.get("./venue/fetchAllVenue");
export const getAllVenuesByOwner = () => API.get("./venue/fetchVenueByOwner");
export const getSinglevenueApi = (id) => API.get(`./venue/fetchVenue/${id}`);
export const createVenueApi = (data) => API.post("./venue/addVenue", data);
export const updateVenueApi = (data, id) =>
  API.patch(`./venue/editVenue/${id}`, data);
export const deleteVenueApi = (id) => API.delete(`./venue/deleteVenue/${id}`);

//Bookings API
export const searchSlots = (id, date) =>
  API.get(`./venueBooking/venue/${id}/availableSlots?date=${date}`);
export const getBookedSlotByUser = () =>
  API.get("./venueBooking/fetchBookedSlotByUser");
export const getBookedSlotByOwner = (id) =>
  API.get(`./venueBooking/fetchBookedSlotByVenue/${id}`);
export const slotBooking = (id, data) =>
  API.post(`./venueBooking/venue/${id}/bookSlot`, data);
export const updateBookingSlot = (data, id) =>
  API.patch(`./venueBooking/bookSlot/${id}`, data);
export const bookingConfirmation = (id) =>
  API.patch(`./venueBooking/bookSlot/${id}/confirmation`);
export const bookingRejection = (id) =>
  API.patch(`./venueBooking/bookSlot/${id}/rejection`);
export const removeBookedSot = (id) =>
  API.delete(`./venueBooking/bookSlot/${id}`);
