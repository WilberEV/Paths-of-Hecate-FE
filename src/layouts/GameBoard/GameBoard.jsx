import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import { images } from "../../Components/Images/Images";
import { isEqual } from "lodash";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import {
  bringCharacterData,
  updateCharacter,
  findLocation,
} from "../../services/apiCalls";

export const GameBoard = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [charaDetails, setCharaDetails] = useState({
    name: "",
    class: "",
    turnsLeft: 0,
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
  const [location, setLocation] = useState({
    xCoordinate: 0,
    yCoordinate: 0,
    events: false,
    description: [],
    background: "",
    answer: false,
    effect: "",
  });

  const [directions, setDirections] = useState({
    up: true,
    down: true,
    right: true,
    left: true,
  });

  const [charaName, setCharaName] = useState("ALL");
  const [itemDescription, setItemDescription] = useState("");
  const [charaNumber, setCharaNumber] = useState(0);
  const [page, setPage] = useState(0);
  const [hasEvent, setHasEvent] = useState(false);

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

        results.data.forEach((chara) => {
          setUpdatedChara((prevState) => ({
            ...prevState,
            turnsLeft: chara.turnsLeft,
            turnsPlayed: chara.turnsPlayed,
            items: chara.items,
            xCoordinate: chara.xCoordinate,
            yCoordinate: chara.yCoordinate,
          }));

          findLocation(chara.xCoordinate, chara.yCoordinate)
            .then((res) => {
              if (res.data !== null) {
                setLocation(res.data);
              }
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  }, [charaName]);

  useEffect(() => {
    const updateGameScreen = async () => {
      const updatedDirections = { ...directions };

      await updateCharacter(
        updatedChara,
        charaName,
        userRdxData.credentials.user.id
      );

      await Promise.all([
        findLocation(updatedChara.xCoordinate, updatedChara.yCoordinate + 1),
        findLocation(updatedChara.xCoordinate, updatedChara.yCoordinate - 1),
        findLocation(updatedChara.xCoordinate + 1, updatedChara.yCoordinate),
        findLocation(updatedChara.xCoordinate - 1, updatedChara.yCoordinate),
      ]).then((results) => {
        results.forEach((res, index) => {
          const key = Object.keys(updatedDirections)[index];
          updatedDirections[key] = res.data !== null;
        });
      });

      setDirections(updatedDirections);
    };

    updateGameScreen();
  }, [updatedChara]);

  const charaPosition = (value) => {
    let newXCoordinate = updatedChara.xCoordinate;
    let newYCoordinate = updatedChara.yCoordinate;

    if (value === "Up") {
      newYCoordinate++;
    } else if (value === "Down") {
      newYCoordinate--;
    } else if (value === "Left") {
      newXCoordinate--;
    } else if (value === "Right") {
      newXCoordinate++;
    }

    findLocation(newXCoordinate, newYCoordinate)
      .then((res) => {
        setPage(0);
        setLocation(res.data);
        setUpdatedChara((prevState) => ({
          ...prevState,
          turnsLeft: prevState.turnsLeft - 1,
          turnsPlayed: prevState.turnsPlayed + 1,
          xCoordinate: newXCoordinate,
          yCoordinate: newYCoordinate,
        }));
        setHasEvent(false);
      })
      .catch((error) => console.log(error));
  };

  const triggerEvent = (answer) => {
    let charaData = {
      ...updatedChara,
      triggeredEvents: [
        ...updatedChara.triggeredEvents,
        [location.xCoordinate, location.yCoordinate],
      ],
    };

    if (answer === location.answer) {
      if (location.effect === "Map" || location.effect === "Torch") {
        charaData.items = [...updatedChara.items, location.effect];
      } else if (location.effect === "add") {
        charaData.turnsLeft += 3;
      } else if (location.effect === "remove") {
        charaData.turnsLeft -= 3;
      }
    }
    setHasEvent(false);
    setUpdatedChara(charaData);
  };

  const checkItems = (item) => {
    return updatedChara.items.includes(item);
  };

  const chooseChara = (name) => {
    return setCharaName(name);
  };

  const nextPage = () => {
    if (page < location.description.length -1) {
      setPage(page + 1);
    } else if (page == location.description.length -1) {
      const containsArray = updatedChara.triggeredEvents.some((event) =>
        isEqual(event, [location.xCoordinate, location.yCoordinate])
      );
      if (location.events === true && containsArray === false) {
        setHasEvent(true);
      }
    }
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
                <div className="mapData"></div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="gameSection">
            <div className="turnCounter">
              Turns left: {updatedChara.turnsLeft}
            </div>
            <div className="upArrow">
              {directions.up === true && (
                <img src={images.Up} onClick={() => charaPosition("Up")} />
              )}
            </div>
            <div className="middleSection">
              <div className="leftArrow">
                {directions.left === true && (
                  <img
                    src={images.Left}
                    onClick={() => charaPosition("Left")}
                  />
                )}
              </div>

              <div className="gameScreen">
                <div className="gameBG">
                  {location.events == true && (
                    <div>
                      {hasEvent == true && (
                        <div className="gameBG">
                          <div
                            className="answerButton"
                            onClick={() => triggerEvent(true)}
                          >
                            Yes
                          </div>
                          <div
                            className="answerButton"
                            onClick={() => triggerEvent(false)}
                          >
                            No
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="gameDescription" onClick={() => nextPage()}>
                  {location.description[page]}
                </div>
              </div>

              <div className="rightArrow">
                {directions.right === true && (
                  <img
                    src={images.Right}
                    onClick={() => charaPosition("Right")}
                  />
                )}
              </div>
            </div>
            <div className="downArrow">
              {directions.down === true && (
                <img src={images.Down} onClick={() => charaPosition("Down")} />
              )}
            </div>
          </div>
          <div className="itemSection">
            <div className="inventoryContainer">
              <div>Inventory:</div>
              <div>
                {updatedChara.items.map((item) => {
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
