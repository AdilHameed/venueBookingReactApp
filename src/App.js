import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Component/Utilities/Header";
import NotFound from "./Component/Utilities/NotFound";
import Login from "./Component/Athentication/login";
import SignUp from "./Component/Athentication/SignUp";
import Venues from "./Component/Venues/venueList";
import AddVenue from "./Component/Venues/AddVenue";
import VenueDetail from "./Component/Venues/venueDetails";
import BookingStatus from "./Component/Bookings/UserBookingRecords/BookingStatusList";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues, fetchVenuesByOwner } from "./Redux/Actions/Venues";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userAuth = useSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    if (!user?.user?.owner) {
      dispatch(fetchVenues());
    } else {
      dispatch(fetchVenuesByOwner());
    }
  }, [userAuth]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path='/'
          element={
            userAuth ? <Navigate to='/venues' /> : <Navigate to='/login' />
          }
        />
        {!userAuth ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/venues' element={<Navigate to='/login' />} />
            <Route path='/venues/:venueId' element={<Navigate to='/login' />} />
            <Route path='/bookingStatus' element={<Navigate to='/login' />} />
          </>
        ) : (
          <>
            <Route path='/venues' element={<Venues />} />
            <Route path='/venues/:venueId' element={<VenueDetail />} />
            {!user?.user?.owner ? (
              <Route path='/bookingStatus' element={<BookingStatus />} />
            ) : (
              <>
                <Route path='/addVenue' element={<AddVenue />} />
                <Route path='/editVenue/:venueId' element={<AddVenue />} />
              </>
            )}
            <Route path='/login' element={<Navigate to='/venues' />} />
            <Route path='/signup' element={<Navigate to='/venues' />} />
          </>
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
