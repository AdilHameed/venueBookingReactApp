import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import styles from "../../StyleSheet/Common.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/Auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //user login checking

  const user = JSON.parse(localStorage.getItem("profile"));
  const userAuth = useSelector((state) => state.authReducer.isAuth);

  //handle for logout
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <Navbar expand='lg' fixed='top' bg='dark' variant='dark'>
      <Container fluid='sm'>
        <NavLink
          to='/venues'
          style={{ color: "white", textDecoration: "none" }}
        >
          <Navbar.Brand style={{ fontSize: "25px" }}>VenueBooking</Navbar.Brand>{" "}
        </NavLink>
        {userAuth && <Navbar.Toggle />}
        <Navbar.Collapse className='justify-content-end mt-1'>
          {userAuth && (
            <>
              <ul className='navbar-nav '>
                <li
                  className={`${styles.headerProfile} nav-item nav-link text-white`}
                >
                  {user?.user?.name.slice(0, 6) + " ..."}
                </li>
                {!user?.user?.owner && (
                  <li className='nav-item nav-link'>
                    <NavLink
                      to='/bookingStatus'
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Check Status
                    </NavLink>
                  </li>
                )}
                <li className='nav-item nav-link' onClick={handleLogout}>
                  <Nav.Link
                    style={{
                      color: "white",
                      textDecoration: "none",
                      position: "relative",
                      bottom: "7px",
                    }}
                  >
                    Logout
                  </Nav.Link>
                </li>
              </ul>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
