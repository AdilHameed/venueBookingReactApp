import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../StyleSheet/Common.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginCheck } from "../../Redux/Actions/Auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  //email validation check
  const enteredEmailIsValid = userData.email.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  //password validation check
  const enteredPasswordIsValid = userData.password.length >= 4;
  const enteredPasswordIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  //form validation check
  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  //function for isEmail touched
  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };
  //function for isPassword touched
  const passwordInputBlurHandler = () => {
    setEnteredPasswordTouched(true);
  };

  //form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setEnteredEmailTouched(true);
    if (!enteredEmailIsValid) {
      return;
    }
    setEnteredPasswordTouched(true);
    if (!enteredPasswordIsValid) {
      return;
    }
    // dispatching form data to redux action
    dispatch(loginCheck(userData, navigate));

    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  // getting error message from reducer if email or passoword is not valid
  const err = useSelector((state) => state.authReducer.errMessage);

  return (
    <>
      <Row className={styles.pageHeight}>
        <Col xs={12} sm={3}></Col>
        <Col xs={12} sm={6}>
          <Container className={styles.loginContainer}>
            <h2 className='text-center mt-1'>LoginX</h2>
            <Form className='mt-3 mb-3' onSubmit={handleSubmit}>
              <Form.Group className='mb-3  ' controlId='formBasicEmail'>
                <Form.Label>Email addressx</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onBlur={emailInputBlurHandler}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <Form.Text className='text-danger'>
                  {emailInputIsInvalid && `Please enter a valid email.`}
                </Form.Text>
              </Form.Group>

              <Form.Group
                className='mb-3 passwordInputClasses'
                controlId='formBasicPassword'
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onBlur={passwordInputBlurHandler}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                <Form.Text className='text-danger'>
                  {enteredPasswordIsInvalid &&
                    `Password length should be greater or equal 4.`}
                </Form.Text>
                <Form.Text className='text-danger'>{err && err}</Form.Text>
              </Form.Group>

              <div className='d-flex justify-content-between'>
                <Button variant='primary' type='submit' disabled={!formIsValid}>
                  Login
                </Button>
                <p>
                  Don&apos;t have an account? <Link to='/signup'>SignUp </Link>
                </p>
              </div>
            </Form>
          </Container>
        </Col>
        <Col xs={12} sm={3}></Col>
      </Row>
    </>
  );
};

export default Login;
