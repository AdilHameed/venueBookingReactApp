import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookSlot, updateBookedSlot } from "../../Redux/Actions/Bookings";

const availableSlot = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookingHandler = () => {
    if (!props.slotId) {
      dispatch(
        bookSlot(props.venueId, { date: props.date, reqSlot: props.slot.name })
      );
    } else {
      dispatch(
        updateBookedSlot(
          props.slotId,
          {
            date: props.date,
            reqSlot: props.slot.name,
          },
          navigate
        )
      );
    }
  };

  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      {props.slot.name}
      <Button className=' btn-success btn-sm' onClick={bookingHandler}>
        {!props.slotId ? "Book" : "Update"}
      </Button>
    </li>
  );
};

export default availableSlot;
