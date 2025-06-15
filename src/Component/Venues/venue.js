/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import img from "../../StyleSheet/download.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteVenue } from "../../Redux/Actions/Venues";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const Venue = (props) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  console.log(Boolean(anchorEl));

  const user = JSON.parse(localStorage.getItem("profile"));

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className='card mb-3' style={{ maxWidth: "540px" }}>
        <div className='row g-0'>
          <div className='col-md-4'>
            <img
              src={props.venue.image ? props.venue.image : img}
              className='img-fluid rounded-start'
              alt='...'
              style={{ height: "9rem", width: "12rem" }}
            />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <Button
                id='basic-button'
                aria-controls='basic-menu'
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
                style={{ float: "right", color: "black" }}
              >
                <BsThreeDotsVertical />
              </Button>
              {user?.user?.owner && (
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link
                    to={`/editVenue/${props.venue._id}`}
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <MenuItem>Edit</MenuItem>
                  </Link>
                  <MenuItem
                    onClick={
                      (handleMenuClose,
                      () => dispatch(deleteVenue(props.venue._id)))
                    }
                  >
                    Remove
                  </MenuItem>
                </Menu>
              )}
              <h5 className='card-title'>{props.venue.name}</h5>

              <p className='card-text'>marriage, birthday, concert, party</p>
              <p className='card-text'>
                <small
                  style={{
                    backgroundColor: "rgba(242, 98, 21, 0.946)",
                    color: "white",
                  }}
                >
                  <i className='fa fa-star' style={{ color: "white" }}></i>
                </small>
                <small style={{ marginLeft: "90px" }}>
                  <Rating
                    initialValue={props.venue.ratings}
                    size='18'
                    readonly='true'
                    fillColor='#bf1111'
                  />
                </small>
                <small>
                  <Link
                    className='btn btn-success btn-sm'
                    to={`/venues/${props.venue._id}`}
                    style={{ marginLeft: "90px" }}
                  >
                    View
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Venue;
