import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../layouts/userSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const datosUserRedux = useSelector(userData);

  const navigate = useNavigate();

  const logMeOut = () => {
    navigate("/");
    dispatch(logout({ credentials: {} }));
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 100 }}>
      <Container>
        <Navbar.Brand href="/">Paths of Hecate</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {!datosUserRedux?.credentials?.token ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="profile">Profile</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              {datosUserRedux?.credentials?.user.role === "ADMIN" && (
                <Nav.Link href="admin">Admin</Nav.Link>
              )}
              <Nav.Link onClick={() => logMeOut()}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
