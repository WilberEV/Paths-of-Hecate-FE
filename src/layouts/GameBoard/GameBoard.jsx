import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import { images } from "../../Components/Images/Images";
import { isEqual } from "lodash";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringCharacterData, updateCharacter, findLocation,findItem} 
  from "../../services/apiCalls";

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
    effect: [],
    hints: "",
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

  //Sets character once choosen
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

          findLocation(chara.xCoordinate, chara.yCoordinate).then((res) => {
            setLocation(res.data);
          });
        });
      })
      .catch((error) => console.log(error));
  }, [charaName]);

  //Updates screen when changing places
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
          if (res.data === null) {
            updatedDirections[key] = false;
          } else if (res.data !== null) {
            if (res.data.yCoordinate === 4) {
              updatedDirections[key] = false;
            } else updatedDirections[key] = true;
          }
        });
      });

      setDirections(updatedDirections);
    };

    updateGameScreen();
  }, [updatedChara]);

  //Determines player's position
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

  //Applies effect of current location
  const triggerEvent = (answer) => {
    if (location.effect[0] !== "Exit") {
      let charaData = {
        ...updatedChara,
        triggeredEvents: [
          ...updatedChara.triggeredEvents,
          [location.xCoordinate, location.yCoordinate],
        ],
      };
      const effectValues = {
        Excellent: 5,
        Good: 3,
        Bad: -3,
        Terrible: -5,
      };

      let value1 = effectValues[location.effect[0]] || 0;
      let value2 = effectValues[location.effect[1]] || 0;

      if (answer === location.answer) {
        charaData.turnsLeft += value1;
        setPage(3);
      } else {
        charaData.turnsLeft += value2;
        setPage(6);
      }
      if (location.effect[0] === "Map" || location.effect[0] === "Torch") {
        charaData.items = [...updatedChara.items, location.effect];
      }
      if (location.effect[0] === "WARRIOR") {
        if (charaDetails[0]["class"] === "WARRIOR") {
          setPage(3);
        } else {
          charaData.turnsLeft -= 3;
          setPage(6);
        }
      }
      setUpdatedChara(charaData);
    } else {
      let torches = checkItems("Torch");
      if (torches == true) {
        let newYCoordinate = updatedChara.yCoordinate + 1;
        setPage(3);
        findLocation(updatedChara.xCoordinate, newYCoordinate).then(() => {
          setUpdatedChara((prevState) => ({
            ...prevState,
            yCoordinate: newYCoordinate,
          }));
        });
      } else setPage(6);
    }
    setHasEvent(false);
  };

  //Checks if player has a certain item
  const checkItems = (item) => {
    if (item === "Torch") {
      const countItems = updatedChara.items.filter((e) => e === item).length;
      return countItems >= 2;
    }
    return updatedChara.items.includes(item);
  };

  //Selects current character
  const chooseChara = (name) => {
    return setCharaName(name);
  };

  //Pass to the next 'Page' of the description
  const nextPage = () => {
    if (page < 1) {
      setPage(page + 1);
    } else if (page == 1) {
      const containsArray = updatedChara.triggeredEvents.some((event) =>
        isEqual(event, [location.xCoordinate, location.yCoordinate])
      );
      if (location.events === true && containsArray === false) {
        setPage(2);
        setHasEvent(true);
      }
    } else if (page > 2 && page < 5) {
      setPage(page + 1);
    } else if (page > 5 && page < location.description.length - 1) {
      setPage(page + 1);
    }
  };

  //Shows Item's information
  const getItemDescription = (name) => {
    findItem(name).then((results) => {
      setItemDescription(results.data.description);
    });
  };

  return (
    <div className="gameBody">
      <img src={images.Stop} className="STOP" />
      {charaName === "ALL" ? (
        <div>
          {charaDetails.name !== "" ? (
            <div className="chooseCharacter">
              <p>Choose your character:</p>
              <div className="characterSelection">
                {charaDetails.map((chara) => {
                  return (
                    <div key={chara._id} className="charaSelectionContainer">
                      <div className="charaSelectionContainer2" onClick={() => chooseChara(chara.name)}>
                        <img src={chara.sprite} />
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
                    <img className="createCharaButton" src={images.Plus} onClick={() => navigate("/characters")}/>
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
                          <img src={chara.sprite} />
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
                <div className="mapData">
                  <img src={images.Map} />
                </div>
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
                  <img src={images.Left} onClick={() => charaPosition("Left")}/>
                )}
              </div>

              <div className="gameScreen">
                <img src={location.background} />
                <div className="gameBG">
                  {location.events == true && (
                    <div>
                      {hasEvent == true &&
                        location.effect[0] !== ("Map" || "Torch") && (
                          <div className="gameBG">
                            <div className="answerButton" onClick={() => triggerEvent(true)}>
                              Yes
                            </div>
                            <div className="answerButton" onClick={() => triggerEvent(false)}>
                              No
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
                <div className="gameDescription" onClick={() => nextPage()}>
                  {charaDetails[0]["class"] === "MAGE" && (
                    <div>
                      {page !== 2 && (
                        <div className="gameDescription">
                          {location.description[page]}
                        </div>
                      )}
                      {page == 2 && (
                        <div className="gameDescription">
                          <div>{location.description[page]}</div>
                          <div>{location.hints}</div>
                        </div>
                      )}
                    </div>
                  )}
                  {charaDetails[0]["class"] !== "MAGE" && (
                    <div className="gameDescription">
                      {location.description[page]}
                    </div>
                  )}
                </div>
              </div>

              <div className="rightArrow">
                {directions.right === true && (
                  <img src={images.Right} onClick={() => charaPosition("Right")}/>
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
                      <div onClick={() => getItemDescription(item)}>{item}</div>
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
