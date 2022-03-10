import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Form from "react-bootstrap/Form";
import AvailableSlots from "./availabeSlot";
import { useDispatch, useSelector } from "react-redux";
import { searchAvailableSlot } from "../../Redux/Actions/Bookings";
import { bookingActions } from "../../Redux/Reducers/Bookings";

const bookings = (props) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");

  const { slots, isLoading, updateSlotTrack } = useSelector(
    (state) => state.bookingsReducer
  );

  useEffect(() => {
    dispatch(bookingActions.slotsLoading());
  }, [date]);

  const searchAvailableSlotsHandler = (e) => {
    e.preventDefault();
    dispatch(searchAvailableSlot(props.venueId, date));
  };

  return (
    <>
      <h3>Search Available Slots</h3>
      <Form className='d-flex mt-3 mb-3' onSubmit={searchAvailableSlotsHandler}>
        <Form.Control
          type='date'
          style={{ width: "270px" }}
          min={moment(new Date()).add(1, "days").format("YYYY-MM-DD")}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button variant='primary' type='submit' className='ms-2'>
          Submit
        </Button>
      </Form>
      <h5>Avalable slots</h5>
      <ul className='list-group'>
        {!isLoading &&
          (slots.length > 0 ? (
            slots.map((slot) => (
              <div key={Math.random()}>
                {/* rendering each available slot component by date */}
                <AvailableSlots
                  slot={slot}
                  date={date}
                  slotId={updateSlotTrack.slotId}
                  venueId={props.venueId}
                />
              </div>
            ))
          ) : (
            <h3 className='text-center mt-5'>No Available Slots Found</h3>
          ))}
      </ul>
    </>
  );
};
export default bookings;
