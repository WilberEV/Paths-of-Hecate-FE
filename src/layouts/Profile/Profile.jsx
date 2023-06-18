import React, { useState, useEffect } from "react";
import "./Profile.css";
import { images } from "../../Components/Images/Images";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringUserProfile, bringCharacterData, deleteCharacterData } from "../../services/apiCalls";
import { InputText } from "../../Components/InputText/InputText";

export const Profile = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
  });

  const [userID, setUserID] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  const [charaDetails, setCharaDetails] = useState({
    name: "",
    class: "",
    turnsLeft: 0,
    turnsPlayed: 0,
    sprite: "",
    triggeredEvents: [],
    items: [],
  });

  const [editData, seteditData] = useState(false);
  const [deleteChara, setDeleteChara] = useState(false);
  const [charaNumber, setCharaNumber] = useState(0);

  //Handlers
  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    bringUserProfile(
      userRdxData.credentials.user.id,
      userRdxData.credentials.token
    )
      .then((results) => {
        setProfileDetails(results.data);
      })
      .catch((error) => console.log(error));
  }, [profileDetails]);

  useEffect(() => {
    bringCharacterData("ALL", userRdxData.credentials.user.id)
      .then((results) => {
        setCharaDetails(results.data);
        setCharaNumber(results.data.length);
      })
      .catch((error) => console.log(error));
  }, [charaDetails]);

  const updateUser = () => {
    updateUserProfile(userID._id, userID, userRdxData.credentials.token)
      .then(() => {
        dontModifyData();
        getUsers(userID._id);
      })
      .catch((error) => console.log(error));
  };

  const eraseCharacter = (name) =>{
    if(deleteChara == true){
      deleteCharacterData(name, userRdxData.credentials.user.id)
        .then(()=>setDeleteChara(false))
        .catch((error) => console.log(error))
    }
  }

  const userHandler = (e) => {
    setUserID((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const modifyData = () => seteditData(true);
  const dontModifyData = () => seteditData(false);

  return (
    <div className="profileBody">
      <div className="profileBG">
        <img src={images.ProBG} />
      </div>
      <div className="profileContainer">
        <div className="userDataContainer">
          <h3>User details</h3>
          <div>
            {profileDetails.name !== "" ? (
              <div>
                {editData === false && (
                  <div>
                    {profileDetails.map((person) => {
                      return (
                        <div className="userDataContainer2" key={person._id}>
                          <div>Name:</div>
                          <div>{person.name}</div>
                          <div>Email:</div>
                          <div>{person.email}</div>
                        </div>
                      );
                    })}
                    <div className="userDataContainer3">
                      <div className="profileButtons" onClick={()=>modifyData()}>
                        Edit
                      </div>
                      <div className="profileButtons" onClick={()=>setDeleteChara(true)}>
                        Delete Character
                      </div>
                    </div>
                  </div>
                )}

                {editData === true && (
                  <div>
                    {profileDetails.map((person) => {
                      return (
                        <div>
                          <div className="userDataContainer2" key={person._id}>
                            <div>Email:</div>
                            <InputText
                              type={"email"}
                              className={"basicInput"}
                              defaultValue={person.email}
                              name={"email"}
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
                          <div className="userDataContainer3">
                            <div
                              className="profileButtons"
                              onClick={() => updateUser()}
                            >
                              Confirm
                            </div>
                            <div
                              className="profileButtons"
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
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
        <div className="charaDataContainer">
          {charaDetails.name !== "" ? (
            <div>
              {charaDetails.map((chara) => {
                return (
                  <div key={chara._id} className="charaDataContainerBox" onClick={()=>eraseCharacter(chara.name)}>
                    <div className="charaDataContainer2">
                      <img src={chara.sprite} />
                    </div>
                    <div className="charaDataContainer3">
                      <div>Name: {chara.name}</div>
                      <div>Class: {chara.class}</div>
                      <div>Turns Left: {chara.turnsLeft}</div>
                      <div>Turns Played: {chara.turnsPlayed}</div>
                      <div>
                        {chara.triggeredEvents.length ? (
                          <div>
                            Triggered events: {chara.triggeredEvents.length}
                          </div>
                        ) : (
                          <div>Triggered events: 0</div>
                        )}
                      </div>
                      <div>
                        {chara.items.length ? (
                          <div>Items: {chara.items.length}</div>
                        ) : (
                          <div> Items: 0</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="newCharaButton">
                {charaNumber >= 0 && charaNumber < 5 && (
                  <img
                    src={images.Plus}
                    onClick={() => navigate("/characters")}
                  />
                )}
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
};
