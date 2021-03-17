import React from "react";
import { Container, Button } from "shards-react";
import { Modal, Row, Col } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaFacebook, FaTwitter } from "react-icons/fa";

function MydModalWithGrid(props) {
  const text =
    "Hello students! I have made a new assignment for you to complete. Please go to the dungeon to complete it. ";
  const shareURL = "http://www.example.com/";
  const twitterURL = `https://twitter.com/intent/tweet?text=${text}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${shareURL}&quote=${text}`;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notify your students about an assignment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={3}>
              <IconContext.Provider value={{ color: "#1da1f2", size: "3em" }}>
                {/* eslint-disable-next-line */}
                <a href={twitterURL} target="_blank">
                  <FaTwitter />
                </a>
              </IconContext.Provider>
            </Col>
            <Col xs={3}>
              <IconContext.Provider value={{ color: "#3b5998", size: "3em" }}>
                {/* eslint-disable-next-line */}
                <a href={facebookURL} target="_blank">
                  <FaFacebook onClick={() => console.log("facebook")} />
                </a>
              </IconContext.Provider>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MydModalWithGrid;
