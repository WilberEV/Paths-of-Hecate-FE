import React from 'react'
import "./Header.css"
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Paths of Hecate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">Login</Nav.Link>
            <Nav.Link href="#pricing">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
