import React, { useState, useEffect } from "react";
import "./Profile.css";
import { images } from "../../Components/Images/Images";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringUserProfile, bringCharacterData } from "../../services/apiCalls";

export const Profile = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
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

  // const [spriteRoute, setSpriteRoute] = useState("");
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
    bringCharacterData(userRdxData.credentials.user.id)
      .then((results) => {
        setCharaDetails(results.data);
        setCharaNumber(results.data.length);
      })
      .catch((error) => console.log(error));
  }, [charaDetails]);

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
                  <div key={chara._id} className="charaDataContainerBox">
                    <div className="charaDataContainer2">
                      <img src={images.Torch} alt="Image" />
                    </div>
                    <div className="charaDataContainer3">
                      <div>Name: {chara.name}</div>
                      <div>Class: {chara.class}</div>
                      <div>Turns Left: {chara.turnsLeft}</div>
                      <div>Turns Played: {chara.turnsPlayed}</div>
                      <div>
                        {chara.triggeredEvents.lenght ? (
                          <div>
                            Triggered events: {chara.triggeredEvents.lenght}
                          </div>
                        ) : (
                          <div>Triggered events: 0</div>
                        )}
                      </div>
                      <div>
                        {chara.items.lenght ? (
                          <div>Items: {chara.items.lenght}</div>
                        ) : (
                          <div> Items: 0</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="newCharaButton">
                {charaNumber > 0 && charaNumber < 5 && (
                  <img src={images.Plus} onClick={() => navigate("/characters")}/>
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
