import { venueActions } from "../Reducers/Venues";
import {
  getAllVenues,
  getAllVenuesByOwner,
  getSinglevenueApi,
  createVenueApi,
  updateVenueApi,
  deleteVenueApi,
} from "../Apis";

// Get Actions
export const fetchVenues = () => async (dispatch) => {
  try {
    dispatch(venueActions.venueLoading);
    const fetchedVenues = await getAllVenues();
    dispatch(venueActions.getVenues(fetchedVenues.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchVenuesByOwner = () => async (dispatch) => {
  try {
    dispatch(venueActions.venueLoading);
    const fetchedVenues = await getAllVenuesByOwner();
    dispatch(venueActions.getVenuesByOwner(fetchedVenues.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchSingleVenue = (id) => async (dispatch) => {
  try {
    dispatch(venueActions.venueLoading);
    const venue = await getSinglevenueApi(id);
    dispatch(venueActions.getVenueById(venue.data));
  } catch (err) {
    console.log(err.message);
  }
};

// Create Actions
export const createVenue = (data, navigate) => async (dispatch) => {
  try {
    const createdVenue = await createVenueApi(data);
    dispatch(venueActions.createVenue(createdVenue.data));
    navigate("/venues");
  } catch (err) {
    console.log(err.message);
  }
};

// Update Actions
export const updateVenue = (data, id, navigate) => async (dispatch) => {
  try {
    const updatedVenue = await updateVenueApi(data, id);
    dispatch(venueActions.updateVenue(updatedVenue.data));
    navigate("/venues");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete Actions
export const deleteVenue = (id) => async (dispatch) => {
  try {
    const deletedVenue = await deleteVenueApi(id);
    dispatch(venueActions.deleteVenue(deletedVenue.data));
  } catch (err) {
    console.log(err.message);
  }
};
