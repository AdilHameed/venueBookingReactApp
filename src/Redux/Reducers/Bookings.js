import { createSlice } from "@reduxjs/toolkit";

const initialBookingState = {
  slots: [],
  userBookedSlot: [],
  ownerBookedSlot: [],
  isLoading: true,
  updateSlotTrack: {
    slotId: null,
    initial: null,
  },
};

const bookingSlice = createSlice({
  name: "Bookings",
  initialState: initialBookingState,
  reducers: {
    slotsLoading(state) {
      state.isLoading = true;
      state.slots = [];
      state.userBookedSlot = [];
    },

    getAvailableSlots(state, action) {
      state.isLoading = false;
      state.slots = action.payload;
    },
    getUserBookedSlot(state, action) {
      state.isLoading = false;
      state.userBookedSlot = action.payload;
    },
    getOwnerBookedSlot(state, action) {
      state.isLoading = false;
      state.ownerBookedSlot = action.payload;
    },

    slotBooking(state, action) {
      state.slots = state.slots.filter(
        (slot) => slot.name !== action.payload.slot
      );
    },

    updateSlotTracking(state, action) {
      state.updateSlotTrack.slotId = action.payload.id;
      state.updateSlotTrack.initial = action.payload.value;
    },
    updateBookingSlot(state, action) {
      state.slotId = null;
      state.userBookedSlot = state.userBookedSlot.map((slot) =>
        slot._id === action.payload._id ? action.payload : slot
      );
    },
    updateSlotConfirmation(state, action) {
      state.ownerBookedSlot = state.ownerBookedSlot.map((slot) =>
        slot._id === action.payload._id ? action.payload : slot
      );
    },
    updateSlotRejection(state, action) {
      state.ownerBookedSlot = state.ownerBookedSlot.map((slot) =>
        slot._id === action.payload._id ? action.payload : slot
      );
    },

    deleteBooking(state, action) {
      state.userBookedSlot = state.userBookedSlot.filter(
        (slot) => slot._id !== action.payload
      );
    },
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
