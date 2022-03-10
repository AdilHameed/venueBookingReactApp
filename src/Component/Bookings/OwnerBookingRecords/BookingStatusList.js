/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import BookingStatus from "./BookingStatus";
import Wrapper from "../../Utilities/Wrapper";
import styles from "../../../StyleSheet/Common.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookedSlotByOwner } from "../../../Redux/Actions/Bookings";

const BookingStatusList = (props) => {
  const dispatch = useDispatch();

  const { ownerBookedSlot, isLoading } = useSelector(
    (state) => state.bookingsReducer
  );

  useEffect(() => {
    dispatch(fetchBookedSlotByOwner(props.venueId));
  }, [dispatch]);

  return (
    <Wrapper>
      <Container className={styles.pageHeight}>
        <h3>Bookings Request</h3>
        <table className='table '>
          <thead>
            <tr>
              <th scope='col'>Booking Date</th>
              <th scope='col'>Slot</th>
              <th scope='col'>Customer</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className='spinner-border m-5' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            ) : ownerBookedSlot.length > 0 ? (
              ownerBookedSlot.map((bookedSlot) => (
                <tr key={bookedSlot._id}>
                  {/* Rendering each bookedslot component in perticular venue  */}
                  <BookingStatus bookedSlot={bookedSlot} />
                </tr>
              ))
            ) : (
              <h1 className='text-center mt-5'>No Booking Found</h1>
            )}
          </tbody>
        </table>
      </Container>
    </Wrapper>
  );
};
export default BookingStatusList;
