import React, { useState, useEffect } from "react";
import "./Profile.css";
import { images } from "../../Components/Images/Images";

export const Profile = () => {
  return (
    <div className="profileBody">
      <div className="profileBG">
        <img src={images.ProBG} />
      </div>
    </div>
  );
};
