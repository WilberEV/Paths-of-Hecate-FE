import axios from "axios";

const URL = "http://localhost:3000";
// const URL = "https://paths-of-hecate-be-production.up.railway.app"

////////////////////USER RELATED FUNCTIONS////////////////////

//Login user
export const logInAccount = async (credentials) => {
  return await axios.post(`${URL}/user/login`, credentials);
};

//Create new user
export const userSignUp = async (credentials) => {
  return await axios.post(`${URL}/user/`, credentials);
};

//Find user
export const bringUserProfile = async (id, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return await axios.get(`${URL}/user/${id}`, config);
};

//Update user

export const updateUserProfile = async (id, data, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  let body = {};
  if (data.name !== "") {
    body.name = data.name;
  }
  if (data.email !== "") {
    body.email = data.email;
  }
  if (data.role !== "") {
    body.role = data.role;
  }
  if (data.password !== "") {
    body.password = data.password;
  }

  return await axios.put(`${URL}/user/${id}`, body, config);
};

////////////////////CHARACTERS RELATED FUNCTIONS////////////////////

//Find Characters
export const bringCharacterData = async (charaName, id) => {
  return await axios.get(`${URL}/characters?name=${charaName}&owner=${id}`);
};

//Create Character
export const charaCreate = async (data) => {
  return await axios.post(`${URL}/characters/`, data);
};

//Update Character
export const updateCharacter = async (body, charaName, id) => {
  return await axios.put(
    `${URL}/characters?name=${charaName}&owner=${id}`,
    body
  );
};

//Delete Character
export const deleteCharacterData = async (charaName, id) => {
  return await axios.delete(`${URL}/characters?name=${charaName}&owner=${id}`);
};

////////////////////LOCATION RELATED FUNCTIONS////////////////////

//Find characters's current location
export const findLocation = async (X, Y) => {
  return await axios.get(`${URL}/location?xCoordinate=${X}&yCoordinate=${Y}`);
};


////////////////////ITEMS RELATED FUNCTIONS////////////////////

//Find characters's current location
export const findItem = async (name) => {
  return await axios.get(`${URL}/items/${name}`);
};
