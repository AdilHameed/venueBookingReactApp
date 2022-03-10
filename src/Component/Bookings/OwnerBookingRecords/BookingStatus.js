/* eslint-disable react/prop-types */
import React from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  updateBookingConfirmation,
  updateBookingRejection,
} from "../../../Redux/Actions/Bookings";

const BookingStatus = (props) => {
  const dispatch = useDispatch();

  const handleConfirmation = () => {
    dispatch(updateBookingConfirmation(props.bookedSlot._id));
  };

  const handleRejectiontion = () => {
    dispatch(updateBookingRejection(props.bookedSlot._id));
  };

  return (
    <>
      <td>{moment(props.bookedSlot.bookingDate).format("DD-MM-YYYY")}</td>
      <td>{props.bookedSlot.slot}</td>
      <td>{props.bookedSlot?.customer?.name}</td>
      <td>
        {props.bookedSlot.isRequested ? (
          props.bookedSlot.isConfirmed ? (
            "Confirmed"
          ) : (
            <>
              <Button
                className='btn-primary btn-sm me-2'
                onClick={handleConfirmation}
              >
                Confirm
              </Button>
              <Button
                className='btn-secondary btn-sm'
                onClick={handleRejectiontion}
              >
                Reject
              </Button>{" "}
            </>
          )
        ) : (
          "Rejected"
        )}
      </td>
    </>
  );
};

export default BookingStatus;
