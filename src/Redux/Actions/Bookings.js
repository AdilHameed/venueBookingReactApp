import { bookingActions } from "../Reducers/Bookings";
import {
  searchSlots,
  getBookedSlotByUser,
  getBookedSlotByOwner,
  slotBooking,
  updateBookingSlot,
  bookingConfirmation,
  bookingRejection,
  removeBookedSot,
} from "../Apis";

// Get Actions
export const searchAvailableSlot = (id, date) => async (dispatch) => {
  try {
    dispatch(bookingActions.slotsLoading);
    const slots = await searchSlots(id, date);
    dispatch(bookingActions.getAvailableSlots(slots.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchBookedSlotByUser = () => async (dispatch) => {
  try {
    dispatch(bookingActions.slotsLoading);
    const slots = await getBookedSlotByUser();
    dispatch(bookingActions.getUserBookedSlot(slots.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchBookedSlotByOwner = (id) => async (dispatch) => {
  try {
    dispatch(bookingActions.slotsLoading);
    const slots = await getBookedSlotByOwner(id);

    dispatch(bookingActions.getOwnerBookedSlot(slots.data));
  } catch (err) {
    console.log(err.message);
  }
};

// Create Actions
export const bookSlot = (id, data) => async (dispatch) => {
  try {
    const slot = await slotBooking(id, data);
    dispatch(bookingActions.slotBooking(slot.data));
  } catch (err) {
    console.log(err.message);
  }
};

// Update Actions
export const updateBookedSlot = (id, data, navigate) => async (dispatch) => {
  try {
    const slot = await updateBookingSlot(id, data);
    dispatch(bookingActions.updateBookingSlot(slot.data));
    navigate("/bookingStatus");
  } catch (err) {
    console.log(err.message);
  }
};

export const updateBookingConfirmation = (id) => async (dispatch) => {
  try {
    const slot = await bookingConfirmation(id);
    dispatch(bookingActions.updateSlotConfirmation(slot.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const updateBookingRejection = (id) => async (dispatch) => {
  try {
    const slot = await bookingRejection(id);
    dispatch(bookingActions.updateSlotRejection(slot.data));
  } catch (err) {
    console.log(err.message);
  }
};

// Delete Actions
export const deleteBookedSlot = (id) => async (dispatch) => {
  try {
    const slot = await removeBookedSot(id);
    dispatch(bookingActions.deleteBooking(slot.data));
  } catch (err) {
    console.log(err.message);
  }
};
