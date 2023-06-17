import React, { useState, useEffect } from "react";
import "./Characters.css";
import { images } from "../../Components/Images/Images";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../Components/InputText/InputText";
import { charaCreate } from "../../services/apiCalls";

export const Characters = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  //Hooks
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    class: "",
    sprite: "",
    owner: userRdxData.credentials.user.id,
  });

  const [message, setMessage] = useState("");

  //Handlers
  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  const inputHandler = (e) => {
    setNewCharacter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const charaDefiner = (e) => {
    let newClass = "";
    let newSprite = "";

    if (e == "Back") {
      setNewCharacter((prevState) => ({
        ...prevState,
        class: newClass,
        sprite: newSprite,
      }));
    } else if (e == "EXPLORER" || e == "MAGE" || e == "WARRIOR") {
      newClass = e;
      setNewCharacter((prevState) => ({
        ...prevState,
        class: newClass,
      }));
    } else
      (newSprite = e),
        setNewCharacter((prevState) => ({
          ...prevState,
          sprite: newSprite,
        }));
  };

  const createCharacter = () => {
    charaCreate(newCharacter)
      .then((result) => {
        setMessage(
          `Your new companion, ${result.data.name}, shall wait for you.`
        );
        setTimeout(() => {
          navigate("/profile");
        }, 2750);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="charactersBody">
      <div className="charactersBG">
        <img src={images.ProBG} />
      </div>

      <div className="charactersContainer">
        {message !== "" ? (
          <div className="welcomeText">{message}</div>
        ) : (
          <div className="charactersContainer">
            <div>
              {newCharacter.class !== "" && (
                <div className="charaSprite">
                  {newCharacter.class === "EXPLORER" &&
                    (newCharacter.sprite === "" ||
                      newCharacter.sprite == "https://iili.io/H6gtOgt.png") && (
                      <img src="https://iili.io/H6gtOgt.png" onClick={() => charaDefiner("https://iili.io/H6gtOgt.png")} />
                    )}
                  {newCharacter.class === "MAGE" &&
                    (newCharacter.sprite === "" ||
                      newCharacter.sprite == "https://iili.io/H6gtN1I.png") && (
                      <img src="https://iili.io/H6gtN1I.png" onClick={() => charaDefiner("https://iili.io/H6gtN1I.png")} />
                    )}
                  {newCharacter.class === "WARRIOR" &&
                    (newCharacter.sprite === "" ||
                      newCharacter.sprite == "https://iili.io/H6gtkdX.png") && (
                      <img src="https://iili.io/H6gtkdX.png" onClick={() => charaDefiner("https://iili.io/H6gtkdX.png")} />
                    )}
                </div>
              )}
            </div>

            <div className="characterDataContainer">
              <div>Character's Name:</div>
              <InputText
                type={"name"}
                className={"basicInput"}
                name={"name"}
                handler={inputHandler}
              />
              <div>
                {newCharacter.name !== "" && (
                  <div>
                    <div>Choose your class:</div>
                    <div
                      className="typesContainer1"
                      onClick={() => charaDefiner("EXPLORER")}
                    >
                      {(newCharacter.class === "" ||
                        newCharacter.class === "EXPLORER") && (
                        <div>
                          <div>Explorer:</div>
                          <div>
                            The swift and cunning Explorers, always carry blank
                            pages to map their environment.
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="typesContainer2"
                      onClick={() => charaDefiner("MAGE")}
                    >
                      <div>
                        {(newCharacter.class === "" ||
                          newCharacter.class === "MAGE") && (
                          <div>
                            <div>Mage:</div>
                            <div>
                              The Wise Mages, with knowledge of the Arcane, they
                              can see what others cannot.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="typesContainer3"
                      onClick={() => charaDefiner("WARRIOR")}
                    >
                      <div>
                        {(newCharacter.class === "" ||
                          newCharacter.class === "WARRIOR") && (
                          <div>
                            <div>Warrior:</div>
                            <div>
                              The strong and priedfull Warriors, more resiliant
                              than their peers, they'll stand tall longer than
                              the rest.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="charaButtonContainer">
                      <div>
                        {newCharacter.class !== "" && (
                          <div
                            className="charaButton"
                            onClick={() => charaDefiner("Back")}
                          >
                            Back
                          </div>
                        )}
                      </div>
                      <div>
                        {newCharacter.sprite !== "" && (
                          <div
                            className="charaButton"
                            onClick={() => createCharacter()}
                          >
                            Create
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              {newCharacter.class !== "" && (
                <div className="charaSprite">
                  {newCharacter.class === "EXPLORER" &&
                    (newCharacter.sprite === "" ||
                      newCharacter.sprite == "https://iili.io/H6gtv7n.png") && (
                      <img src="https://iili.io/H6gtv7n.png" onClick={() => charaDefiner("https://iili.io/H6gtv7n.png")} />
                    )}
                  {newCharacter.class === "MAGE" &&
                    (newCharacter.sprite === "" ||
                      newCharacter.sprite == "https://iili.io/H6gt8es.png") && (
                      <img src="https://iili.io/H6gt8es.png" onClick={() => charaDefiner("https://iili.io/H6gt8es.png")} />
                    )}
                  {newCharacter.class === "WARRIOR" &&
                    (newCharacter.sprite === "" ||
                      newCharacter.sprite == "https://iili.io/H6gtSmG.png") && (
                      <img src="https://iili.io/H6gtSmG.png" onClick={() => charaDefiner("https://iili.io/H6gtSmG.png")} />
                    )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
