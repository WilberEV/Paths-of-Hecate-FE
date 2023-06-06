import React, { useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { images } from "../Images/Images";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();

  const datosUserRedux = useSelector(userData);

  const navigate = useNavigate();

  return (
    <div>
      {!datosUserRedux?.credentials?.token ? (
        <div>
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <div className="headerLogo" onClick={() => navigate("/")}>
                <img src={images.logoHeader} />
                <img src="https://see.fontimg.com/api/renderfont4/YaaO/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNGRkZGRkYiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/SGVwaGFlc3R1cw/aspire-demibold.png" />
              </div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <div
                    className="headerButton"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </div>
                  <div
                    className="headerButton"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      ) : (
        <div>
          {datosUserRedux?.credentials?.user.role === "ADMIN" && (
            <div className="adminButton" onClick={() => navigate("/admin")}>
              Admin
            </div>
          )}

          <div>
            <Navbar collapseOnSelect expand="lg">
              <Container>
                <div className="headerLogo" onClick={() => navigate("/")}>
                  <img src={images.logoHeader} />
                  <img src="https://see.fontimg.com/api/renderfont4/YaaO/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNGRkZGRkYiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/SGVwaGFlc3R1cw/aspire-demibold.png" />
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto"></Nav>
                  <Nav>
                    <div
                      className="headerButton"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </div>
                    <div className="headerButton" onClick={() => logMeOut()}>
                      Logout
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      )}
    </div>
  );
};
