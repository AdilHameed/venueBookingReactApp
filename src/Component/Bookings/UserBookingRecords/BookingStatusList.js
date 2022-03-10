import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import BookingStatus from "./BookingStatus";
import Wrapper from "../../Utilities/Wrapper";
import styles from "../../../StyleSheet/Common.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookedSlotByUser } from "../../../Redux/Actions/Bookings";

const BookingStatusList = () => {
  const dispatch = useDispatch();

  const { userBookedSlot, isLoading } = useSelector(
    (state) => state.bookingsReducer
  );

  useEffect(() => {
    dispatch(fetchBookedSlotByUser());
  }, [dispatch]);

  return (
    <Wrapper>
      <Container className={styles.pageHeight}>
        <table className='table '>
          <thead>
            <tr>
              <th scope='col'>Booking Date</th>
              <th scope='col'>Slot</th>
              <th scope='col'>Venue</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className='spinner-border m-5' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            ) : userBookedSlot.length > 0 ? (
              userBookedSlot.map((bookedSlot) => (
                <tr key={bookedSlot._id}>
                  {/* Rendering each bookedslot component by user  */}
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
