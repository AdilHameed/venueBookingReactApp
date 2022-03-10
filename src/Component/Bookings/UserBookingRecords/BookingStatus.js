/* eslint-disable react/prop-types */
import React from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteBookedSlot } from "../../../Redux/Actions/Bookings";
import { bookingActions } from "../../../Redux/Reducers/Bookings";

const BookingStatus = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemove = () => {
    dispatch(deleteBookedSlot(props.bookedSlot._id));
  };

  const handleUpdate = () => {
    dispatch(
      bookingActions.updateSlotTracking({ id: props.bookedSlot._id, value: 1 })
    );
    navigate(`/venues/${props.bookedSlot.venue._id}`);
  };

  return (
    <>
      <td>{moment(props.bookedSlot.bookingDate).format("DD-MM-YYYY")}</td>
      <td>{props.bookedSlot.slot}</td>
      <td>{props.bookedSlot?.venue?.name}</td>
      <td>
        {props.bookedSlot.isRequested
          ? props.bookedSlot.isConfirmed
            ? "Confirmed"
            : "Requested"
          : "Rejected"}
      </td>
      <td>
        <Button
          className='btn-primary btn-sm me-2'
          disabled={
            props.bookedSlot.isConfirmed || !props.bookedSlot.isRequested
          }
          onClick={handleUpdate}
        >
          Edit <FaRegEdit />
        </Button>

        <Button
          className='btn-secondary btn-sm'
          disabled={props.bookedSlot.isConfirmed}
          onClick={handleRemove}
        >
          Cancel <ImCancelCircle />
        </Button>
      </td>
    </>
  );
};
export default BookingStatus;
