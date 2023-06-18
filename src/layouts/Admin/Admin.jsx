import React, { useState, useEffect } from "react";
import "./Admin.css";
import { images } from "../../Components/Images/Images";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import {
  bringUserProfile,
  updateUserProfile,
  bringCharacterData,
} from "../../services/apiCalls";
import jwt_decode from "jwt-decode";
import { InputText } from "../../Components/InputText/InputText";

export const Admin = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [profileDetails, setProfileDetails] = useState([
    {
      _id: "",
      name: "",
      email: "",
      role: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const [charaDetails, setCharaDetails] = useState({
    name: "",
    class: "",
    turnsLeft: 0,
    turnsPlayed: 0,
    sprite: "",
    triggeredEvents: [],
    items: [],
  });

  const [userID, setUserID] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  const [charaName, setCharaName] = useState("ALL");
  const [showChara, setShowChara] = useState(false);
  const [editData, seteditData] = useState(false);

  //Handlers
  useEffect(() => {
    if (!userRdxData.credentials.token) {
      const decoded = jwt_decode(userRdxData.credentials.token);
      if (decoded.role !== "ADMIN") {
        navigate("/");
      }
    }
  }, []);

  const getUsers = (role) => {
    bringUserProfile(role, userRdxData.credentials.token)
      .then((results) => {
        setProfileDetails(results.data);
        dontModifyData();
        dontDisplayChara();
        bringCharacterData(charaName, results.data[0]["_id"]).then((res) => {
          setCharaDetails(res.data);
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    bringCharacterData(charaName, profileDetails[0]["_id"]).then((results) => {
      setCharaDetails(results.data);
    });
  }, [charaName]);

  const updateUser = () => {
    updateUserProfile(userID._id, userID, userRdxData.credentials.token)
      .then(() => {
        dontModifyData();
        getUsers(userID._id);
      })
      .catch((error) => console.log(error));
  };

  const userHandler = (e) => {
    setUserID((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const chooseChara = (name) => {
    return setCharaName(name);
  };

  const modifyData = () => seteditData(true);
  const dontModifyData = () => seteditData(false);
  const displayChara = () => setShowChara(true);
  const dontDisplayChara = () => {
    setShowChara(false);
    setCharaName("ALL");
  };

  return (
    <div className="adminBody">
      <div className="adminBG">
        <img src={images.ProBG} />
      </div>
      <div className="adminContainer">
        <div className="adminButtonsContainer">
          <div className="adminButtons" onClick={() => getUsers("USER")}>
            Users
          </div>
          <div className="adminButtons" onClick={() => getUsers("ADMIN")}>
            Admins
          </div>
        </div>
        <div className="adminInfo">
          {profileDetails[0]["_id"] !== "" &&
            editData === false &&
            showChara === false && (
              <div>
                {profileDetails.map((person) => {
                  return (
                    <div className="userInformation" key={person._id}>
                      <div className="userSplit"></div>
                      <div>ID: {person._id}</div>
                      <div>Name: {person.name}</div>
                      <div>Email: {person.email}</div>
                      <div>Role: {person.role}</div>
                      <div>Creation Date: {person.createdAt}</div>
                      <div>Last update: {person.updatedAt}</div>
                      <div className="userSplit"></div>
                    </div>
                  );
                })}
                <div>
                  {profileDetails.length == 1 && (
                    <div className="adminContainer3">
                      <div
                        className="adminButtons"
                        onClick={() => modifyData()}
                      >
                        Edit
                      </div>
                      <div
                        className="adminButtons"
                        onClick={() => displayChara()}
                      >
                        Characters
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          {profileDetails[0]["_id"] !== "" &&
            editData === true &&
            showChara === false && (
              <div>
                {profileDetails.map((person) => {
                  return (
                    <div>
                      <div className="userInformation" key={person._id}>
                        <div>Name:</div>
                        <InputText
                          type={"name"}
                          className={"basicInput"}
                          defaultValue={person.name}
                          name={"name"}
                          handler={userHandler}
                        />
                        <div>Email:</div>
                        <InputText
                          type={"email"}
                          className={"basicInput"}
                          defaultValue={person.email}
                          name={"email"}
                          handler={userHandler}
                        />
                        <div>Role:</div>
                        <InputText
                          type={"role"}
                          className={"basicInput"}
                          defaultValue={person.role}
                          name={"role"}
                          handler={userHandler}
                        />
                        <div>Password:</div>
                        <InputText
                          type={"password"}
                          className={"basicInput"}
                          placeholder={"Password"}
                          name={"password"}
                          handler={userHandler}
                        />
                      </div>
                      <div className="adminContainer3">
                        <div
                          className="adminButtons"
                          onClick={() => updateUser()}
                        >
                          Confirm
                        </div>
                        <div
                          className="adminButtons"
                          onClick={() => dontModifyData()}
                        >
                          Cancel
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          {profileDetails[0]["_id"] !== "" &&
            editData === false &&
            showChara === true && (
              <div>
                <div>
                  {charaDetails.map((chara) => {
                    return (
                      <div
                        className="characterInformation"
                        key={chara._id}
                        onClick={() => chooseChara(chara.name)}
                      >
                        <div className="userSplit"></div>
                        <div>Name: {chara.name}</div>
                        <div>Class: {chara.class}</div>
                        <div>Turns left: {chara.turnsLeft}</div>
                        <div>Turns played: {chara.turnsPlayed}</div>
                        <div className="userSplit"></div>
                      </div>
                    );
                  })}
                </div>

                <div className="adminContainer3">
                  <div
                    className="adminButtons"
                    onClick={() => dontDisplayChara()}
                  >
                    Back
                  </div>
                  <div className="adminButtons" onClick={() => displayChara()}>
                    Delete
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="adminRigthContainer">
          <InputText
            type={"_id"}
            className={"basicInput"}
            placeholder={"User's ID"}
            name={"_id"}
            handler={userHandler}
          />
          <div className="adminRigthButtonsContainer">
            <div className="adminButtons" onClick={() => getUsers(userID._id)}>
              Find
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
