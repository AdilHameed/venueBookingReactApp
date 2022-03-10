import { createSlice } from "@reduxjs/toolkit";

const initialVenueState = {
  venues: [],
  venueDetail: null,
  isLoading: true,
};

const venueSlice = createSlice({
  name: "venue",
  initialState: initialVenueState,
  reducers: {
    venueLoading(state) {
      state.isLoading = true;
      state.venues = [];
    },
    getVenues(state, action) {
      state.isLoading = false;
      state.venues = action.payload;
    },
    getVenuesByOwner(state, action) {
      state.isLoading = false;
      state.venues = action.payload;
      console.log(state.venues.venues);
    },
    getVenueById(state, action) {
      state.isLoading = false;
      state.venueDetail = action.payload;
    },
    createVenue(state, action) {
      state.venues.venues = [...state.venues.venues, action.payload];
    },
    updateVenue(state, action) {
      state.venues.venues = state.venues.venues.map((venue) =>
        venue._id === action.payload._id ? action.payload : venue
      );
    },
    deleteVenue(state, action) {
      state.venues.venues = state.venues.venues.filter(
        (venue) => venue._id !== action.payload
      );
    },
  },
});

export const venueActions = venueSlice.actions;
export default venueSlice.reducer;
