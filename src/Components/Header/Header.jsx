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
    <div>
      {!datosUserRedux?.credentials?.token ? (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Paths of Hecate</Navbar.Brand>
              <Nav className="me-auto">

              </Nav>
              <Nav>
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="signup">Sign Up</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      ) : (
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">Paths of Hecate</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="profile">Profile</Nav.Link>
                </Nav>
                <Nav>
                {datosUserRedux?.credentials?.user.role === "ADMIN" && (
                    <Nav.Link href="admin">Admin</Nav.Link>
                  )}
                  <Nav.Link onClick={() => logMeOut()}>Log Out</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
      )}
    </div>
  );
};
