import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../Utilities/Wrapper";
import styles from "../../StyleSheet/Common.module.css";

const NotFound = () => {
  return (
    <Wrapper>
      <Row className={styles.pageHeight}>
        <Col xs={12}>
          <h1 className='text-center mt-5'>Page not found</h1>
        </Col>
      </Row>
    </Wrapper>
  );
};
export default NotFound;
