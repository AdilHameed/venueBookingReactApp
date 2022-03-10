import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileBase from "react-file-base64";
import styles from "../../StyleSheet/Common.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createVenue, updateVenue } from "../../Redux/Actions/Venues";
import { useNavigate, useParams } from "react-router-dom";

const AddVenue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ratings: null,
    image: "",
  });

  const { venueId } = params;

  const { venues } = useSelector((state) => state.venuesReducer);

  const venue = venues?.venues?.find((ven) => ven._id === venueId);

  useEffect(() => {
    if (venue) setFormData(venue);
  }, [venue]);

  //form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!venue) {
      dispatch(createVenue(formData, navigate));
    } else {
      dispatch(updateVenue(formData, venueId, navigate));
    }
  };

  return (
    <>
      <Row className={styles.pageHeight}>
        <Col xs={12} sm={3}></Col>
        <Col xs={12} sm={6}>
          <Container className={styles.loginContainer}>
            <h2 className='text-center mt-1'>
              {venue ? "Edit Venue" : "Add Venue"}
            </h2>
            <Form className='mt-3 mb-3' onSubmit={handleSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group className='mb-3  ' controlId='formBasicText'>
                    <Form.Label>Venue Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter name'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3  ' controlId='formBasicNumber'>
                    <Form.Label>Ratings</Form.Label>
                    <Form.Control
                      type='number'
                      step={0.1}
                      placeholder='Enter ratings'
                      value={formData.ratings}
                      onChange={(e) =>
                        setFormData({ ...formData, ratings: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className='mb-3  ' controlId='formBasicEmail'>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlTextarea1'
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    value={formData.description}
                    rows={2}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Group>
              <div>
                <FileBase
                  type='file'
                  multiple={false}
                  onDone={({ base64 }) =>
                    setFormData({ ...formData, image: base64 })
                  }
                />
              </div>
              <Button variant='primary' type='submit' className='mt-2'>
                Submit
              </Button>
            </Form>
          </Container>
        </Col>
        <Col xs={12} sm={3}></Col>
      </Row>
    </>
  );
};

export default AddVenue;
