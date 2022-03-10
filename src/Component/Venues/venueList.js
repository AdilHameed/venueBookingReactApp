import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Wrapper from "../Utilities/Wrapper";
import Venue from "./venue";
import Container from "react-bootstrap/Container";
import styles from "../../StyleSheet/Common.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VenueList = () => {
  const { venues, isLoading } = useSelector((state) => state.venuesReducer);

  const { user } = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      <Wrapper>
        <Container className={styles.pageHeight}>
          <Row>
            {isLoading ? (
              <div className='spinner-border m-5' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            ) : venues.venues.length > 0 ? (
              venues.venues.map((venue) => {
                return (
                  <Col xs={12} sm={6} md={6} lg={6} xl={6} key={venue._id}>
                    <Venue venue={venue} />
                  </Col>
                );
              })
            ) : (
              <h1 className='text-center mt-5'>No Products Found</h1>
            )}
          </Row>
          <Row>
            {user?.owner && (
              <>
                <b>Add venue</b>
                <Link to='/addVenue'>
                  <Fab size='medium' color='primary' aria-label='add'>
                    <AddIcon />
                  </Fab>
                </Link>
              </>
            )}
          </Row>
        </Container>
      </Wrapper>
    </>
  );
};

export default VenueList;
