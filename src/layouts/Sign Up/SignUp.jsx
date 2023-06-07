import React, { useState, useEffect } from "react";
import './SignUp.css'

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { InputText } from "../../components/InputText/InputText";
import { userSignUp } from "../../services/apiCalls";
import { userData } from "../userSlice"

export const SignUp = () => {

  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  //Handler
  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const signingIn = () => {
    userSignUp(credentials)
      .then((result) => {

        setMessage(`Well met, ${result.data.name}, may the Goddess light your path.`);

        setTimeout(() => {
          navigate("/login");
        }, 2750);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);


  return (
    <div className="signUpBody">
      {message != "" ? (
        <div>{message}</div>
      ) : (
        <div className="signUpContainer">
          <div className="signUpContainer2">
            <div>Name:</div>
            <InputText
              type={"name"}
              className={"basicInput"}
              placeholder={""}
              name={"name"}
              handler={inputHandler}
            />
            <div>Email:</div>
            <InputText
              type={"email"}
              className={"basicInput"}
              placeholder={""}
              name={"email"}
              handler={inputHandler}
            />
            <div>Password:</div>
            <InputText
              type={"password"}
              className={"basicInput"}
              placeholder={""}
              name={"password"}
              handler={inputHandler}
            />
          </div>
          <div className="signUpContainer3">
          <div className="signUpButton" onClick={() => signingIn()}>
              Sign Up
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
