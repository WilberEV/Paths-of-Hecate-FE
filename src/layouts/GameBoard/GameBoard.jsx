import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import { images } from "../../Components/Images/Images";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringCharacterData } from "../../services/apiCalls";

export const GameBoard = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [charaDetails, setCharaDetails] = useState({
    name: "",
    class: "",
    turnsLeft: 0,
    turnsPlayed: 0,
    sprite: "",
    triggeredEvents: [],
    items: [],
  });

  const [charaName, setCharaName] = useState("");

  //Handlers
  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    bringCharacterData("Sylvie", userRdxData.credentials.user.id)
      .then((results) => {
        setCharaDetails(results.data);
      })
      .catch((error) => console.log(error));
  }, [charaName]);

  return (
    <div className="gameBody">
      <div className="charaSection">
        <div className="playerData">
          {charaDetails.name !== "" ? (
            <div>
              {charaDetails.map((chara) => {
                return (
                  <div key={chara._id} className="playerDataContainer">
                    <div className="playerDataContainer2">
                      {chara.sprite === "P1" && <img src={images.P1} />}
                      {chara.sprite === "P2" && <img src={images.P2} />}
                      {chara.sprite === "P3" && <img src={images.P3} />}
                      {chara.sprite === "P4" && <img src={images.P4} />}
                      {chara.sprite === "P5" && <img src={images.P5} />}
                      {chara.sprite === "P6" && <img src={images.P6} />}
                    </div>
                    <div className="playerDataContainer3">
                      <div>Name: {chara.name}</div>
                      <div>Class: {chara.class}</div>
                      <div>Turns Left: {chara.turnsLeft}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
        <div className="mapContainer">
          {charaDetails.items == ["Map"] && (
            <div className="mapData"></div>
          )}
        </div>
      </div>
      <div className="gameSection">
        <div>turns left</div>
        <div>arrow up</div>
        <div>
          <div>arrow left</div>
          <div>game screen</div>
          <div>arrow right</div>
        </div>
        <div>arrow down</div>
      </div>
      <div className="itemSection">
        <div>inventory</div>
        <div>item description</div>
      </div>
    </div>
  );
};
