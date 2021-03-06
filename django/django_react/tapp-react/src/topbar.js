import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";
import PropTypes from 'prop-types';
import { logout } from './actions/auth';
import { changeDefault } from './actions/auth';
import { connect } from 'react-redux';

export class TopBar extends Component{
  render() { 
  const {isAuthenticated, u} = this.props.auth;
  console.log(isAuthenticated);
  if (!isAuthenticated){
    return (
    <Navbar style={{backgroundColor: '#36453b'}} variant="dark" expand="lg" fixed="top" fluid>
      <Navbar.Brand>Tapp</Navbar.Brand>
      <Navbar.Toggle aria-controls="response-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
          <Button variant="info" className="mx-2 ml-md-0" onClick={this.props.login} > Login </Button>
          <Button variant="info" className="mx-2 ml-md-0" onClick={this.props.signin}> Register </Button>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
  if (isAuthenticated){
    const userlist = JSON.parse(this.props.myuser.listcourses);
    return (
    <Navbar style={{backgroundColor: '#36453b'}} variant="dark" expand="lg" fixed="top" fluid>
      <Navbar.Brand>TApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="response-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
      <DropdownButton variant="info" className="mx-2 ml-md-0" title={this.props.myuser.course}>
	    {
              Object.keys(userlist).map((id,instr) => (
		(this.props.myuser.course===id) ?
	        null :<Dropdown.Item onClick={() => this.props.changeDefault(id, userlist[id])}> {id} </Dropdown.Item> 
	    
	      ))
	    }
      </DropdownButton>
      <Button variant="info" className="mx-2 ml-md-0" onClick={this.props.prof}> Profile </Button>
      <Link to="/">
          <Button variant="info" className="mx-2 ml-md-0" onClick={this.props.logout}> Logout </Button>
      </Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
}

TopBar.propTypes = {
  auth: PropTypes.object.isRequired,
  changeDefault: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, changeDefault }) (TopBar);
