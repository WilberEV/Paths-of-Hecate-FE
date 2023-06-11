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

  const [charaName, setCharaName] = useState("ALL");
  const [charaItems, setCharaItems] = useState([""]);
  const [itemDescription, setItemDescription] = useState("");
  const [charaNumber, setCharaNumber] = useState(0);
  const [turnCounter, setTurnCounter] = useState(0);

  //Handlers
  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    bringCharacterData(charaName, userRdxData.credentials.user.id)
      .then((results) => {
        setCharaDetails(results.data);
        setCharaNumber(results.data.length);
        results.data.map((chara) => setCharaItems(chara.items));
        results.data.map((chara) => setTurnCounter(chara.turnsLeft));
      })
      .catch((error) => console.log(error));
  }, [charaName]);

  const checkItems = (item) => {
    return charaItems.includes(item);
  };

  const chooseChara = (name) => {
    return setCharaName(name);
  };

  return (
    <div className="gameBody">
      {charaName === "ALL" ? (
        <div>
          {charaDetails.name !== "" ? (
            <div className="chooseCharacter">
              <p>Choose your character:</p>
              <div className="characterSelection">
                {charaDetails.map((chara) => {
                  return (
                    <div key={chara._id} className="charaSelectionContainer">
                      <div
                        className="charaSelectionContainer2"
                        onClick={() => chooseChara(chara.name)}
                      >
                        {chara.sprite === "P1" && <img src={images.P1} />}
                        {chara.sprite === "P2" && <img src={images.P2} />}
                        {chara.sprite === "P3" && <img src={images.P3} />}
                        {chara.sprite === "P4" && <img src={images.P4} />}
                        {chara.sprite === "P5" && <img src={images.P5} />}
                        {chara.sprite === "P6" && <img src={images.P6} />}
                      </div>
                      <div className="charaSelectionContainer3">
                        <div>Name: {chara.name}</div>
                        <div>Turns Left: {chara.turnsLeft}</div>
                      </div>
                    </div>
                  );
                })}
                <div>
                  {charaNumber >= 0 && charaNumber < 5 && (
                    <img
                      className="createCharaButton"
                      src={images.Plus}
                      onClick={() => navigate("/characters")}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      ) : (
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
              {checkItems("Map") ? (
                <div className="mapData" key={charaItems.key}></div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="gameSection">
            <div className="turnCounter">
              Turns left: {turnCounter}
            </div>
            <div className="upArrow"></div>
            <div className="middleSection">
              <div className="leftArrow"></div>
              <div className="gameScreen"></div>
              <div className="rightArrow"></div>
            </div>
            <div className="downArrow"></div>
          </div>
          <div className="itemSection">
            <div className="inventoryContainer">
              <div>Inventory:</div>
              <div>
                {charaItems.map((item) => {
                  return (
                    <div key={item._id} className="itemDisplay">
                      <div onClick={() => setItemDescription(item)}>{item}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="itemDescription">{itemDescription}</div>
          </div>
        </div>
      )}
    </div>
  );
};
