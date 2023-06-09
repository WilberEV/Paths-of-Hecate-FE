import React, { useState, useEffect } from "react";
import "./Profile.css";
import { images } from "../../Components/Images/Images";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringUserProfile } from "../../services/apiCalls";

export const Profile = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
  });

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
        <div className="charaDataContainer"></div>
      </div>
    </div>
  );
};
