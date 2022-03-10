import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../Utilities/Wrapper";
import Container from "react-bootstrap/Container";
import styles from "../../StyleSheet/productDetail.module.css";
import img from "../../StyleSheet/download.jpg";
import Bookings from "../Bookings/bookings";
import OwnerBookingStatus from "../Bookings/OwnerBookingRecords/BookingStatusList";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookingActions } from "../../Redux/Reducers/Bookings";
import { fetchSingleVenue } from "../../Redux/Actions/Venues";

const VenueDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { venueId } = params;

  const user = JSON.parse(localStorage.getItem("profile"));

  const { venueDetail, isLoading } = useSelector(
    (state) => state.venuesReducer
  );

  const { updateSlotTrack } = useSelector((state) => state.bookingsReducer);

  useEffect(() => {
    if (updateSlotTrack.initial === 2) {
      dispatch(
        bookingActions.updateSlotTracking({
          id: null,
          value: updateSlotTrack.initial,
        })
      );
    } else {
      let value = updateSlotTrack.initial;
      value += 1;
      dispatch(
        bookingActions.updateSlotTracking({
          id: updateSlotTrack.slotId,
          value,
        })
      );
    }

    dispatch(fetchSingleVenue(venueId));
  }, [venueId]);

  if (!isLoading && !venueDetail) {
    return (
      <Wrapper>
        <Container style={{ minHeight: "100vh" }}>
          <h2 className='text-center'>No venue found</h2>;
        </Container>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Container style={{ minHeight: "100vh" }}>
        {isLoading ? (
          <div className='spinner-border m-5' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : (
          <Row>
            <Col xs={12} md={6} lg={6} xl={6}>
              <img
                src={venueDetail.image ? venueDetail.image : img}
                className={styles.productDetailsImage}
              />
              <h2 className='mb-5'>{venueDetail.name}</h2>
              <Row>
                <Col xs={12} sm={5}>
                  <Rating
                    initialValue={venueDetail.ratings}
                    size='25'
                    readonly='true'
                    fillColor={"#0bb51c"}
                  />
                  <span className='ms-1'>{4}</span>
                </Col>
                <Col>
                  <p>product-type: Wedding, birthday</p>
                </Col>
              </Row>
              <p className='fs-10'>
                <b>Description : </b>
                {venueDetail.description}
              </p>
            </Col>
            <Col>
              {!user?.user?.owner ? (
                // booking Component rendered
                <Bookings venueId={venueId} />
              ) : (
                // booking status by venueOwner rendered
                <OwnerBookingStatus venueId={venueId} />
              )}
            </Col>
          </Row>
        )}
      </Container>
    </Wrapper>
  );
};

export default VenueDetails;
