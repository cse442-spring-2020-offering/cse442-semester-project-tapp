import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudents } from './actions/students';
import { login } from './actions/auth';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";


export class ProfileModal extends Component  {

    constructor(props) {
    super(props)
    this.state = {
            show: props.show
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

  }

  handleCheckboxChange(event) {
    this.setState({
        isInstructor: event.target.checked,
    });
  }

  render() {
  return (
    <Modal onHide = {this.props.onHide} show = {this.props.show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title> Profile </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Personal information
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
	      <p>Name: {this.props.user.name} </p>
	      <p> Email ID: {this.props.user.email} </p>
	    </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Course enrolled in 
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>{this.props.user.course} {this.props.user.instructor ? " (instructor)" : null}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Add courses 
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
	        <Form.Group controlId="formBasicText">
	          <Form.Label> Course ID: </Form.Label>
	          <Form.Control name="text" type="text" placeholder="Enter course" required/>
                  <Form.Control.Feedback type="invalid"> {this.state.emailMessage} </Form.Control.Feedback> 
	        </Form.Group>
                <Form.Check
                  type={'checkbox'}
	          name="ins"
                  label={'Instructor?'}
	          onChange={this.handleCheckboxChange}
                />
	      <Button variant="primary" type="submit" disabled={this.props.isLoad}> {this.props.isLoad ? 'Loading...':'Add'} </Button>
	    </Form>
	    
	    </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
  }
}

ProfileModal.propTypes = {
        login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {login})(ProfileModal);
