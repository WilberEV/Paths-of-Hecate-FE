import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import { images } from "../../Components/Images/Images";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringCharacterData, updateCharacter } from "../../services/apiCalls";

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
    xCoordinate: 0,
    yCoordinate: 0,
  });

  const [updatedChara, setUpdatedChara] = useState({
    turnsLeft: 0,
    turnsPlayed: 0,
    triggeredEvents: [],
    items: [],
    xCoordinate: 0,
    yCoordinate: 0,
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
        results.data.map((chara) =>
          setUpdatedChara((prevState) => ({
            ...prevState,
            turnsLeft: chara.turnsLeft,
            turnsPlayed: chara.turnsPlayed,
            xCoordinate: chara.xCoordinate,
            yCoordinate: chara.yCoordinate,
          }))
        );
      })
      .catch((error) => console.log(error));
  }, [charaName]);

  useEffect(() => {
    updateCharacter(updatedChara, charaName, userRdxData.credentials.user.id)
      .then((results) => {
        setTurnCounter(results.data.turnsLeft)
      })
      .catch((error) => console.log(error));
  }, [updatedChara]);

  const charaPosition = (value) => {
    let newXCoordinate = 0;
    let newYCoordinate = 0;

    if (value === "Up") {
      newYCoordinate++;
    } else if (value === "Down") {
      newYCoordinate--;
    } else if (value === "Left") {
      newXCoordinate--;
    } else if (value === "Right") {
      newXCoordinate++;
    }

     setUpdatedChara((prevState) => ({
      ...prevState,
      turnsLeft: prevState.turnsLeft - 1,
      turnsPlayed: prevState.turnsPlayed + 1,
      xCoordinate: prevState.xCoordinate + newXCoordinate,
      yCoordinate: prevState.yCoordinate + newYCoordinate,
    }));
  };

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
            <div className="turnCounter">Turns left: {turnCounter}</div>
            <div className="upArrow" onClick={() => charaPosition("Up")}>
              <img src={images.Up} />
            </div>
            <div className="middleSection">
              <div className="leftArrow" onClick={() => charaPosition("Left")}>
                <img src={images.Left} />
              </div>
              <div className="gameScreen"></div>
              <div className="rightArrow" onClick={() => charaPosition("Right")}>
                <img src={images.Right} />
              </div>
            </div>
            <div className="downArrow" onClick={() => charaPosition("Down")}>
              <img src={images.Down} />
            </div>
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
