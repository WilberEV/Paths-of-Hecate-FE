import React, { useState, useEffect } from "react";
import "./Characters.css";
import { images } from "../../Components/Images/Images";

export const Characters = () => {
  return (
    <div className="charactersBody">
      <div className="charactersBG">
        <img src={images.ProBG} />
      </div>
    </div>
  )
}
