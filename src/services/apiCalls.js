import axios from 'axios';

////////////////////USER RELATED FUNCTIONS////////////////////

//Login user
export const logInAccount = async (credentials) => {

  return await axios.post('http://localhost:3000/user/login', credentials)
}

//Create new user
export const userSignUp = async (credentials) =>{

  return await axios.post('http://localhost:3000/user/', credentials);

}

//Find user
export const bringUserProfile = async (id, token) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };

  return await axios.get(`http://localhost:3000/user/${id}`, config);
}


////////////////////CHARACTERS RELATED FUNCTIONS////////////////////

//Find Characters
export const bringCharacterData = async (charaName, id) => {

  return await axios.get(`http://localhost:3000/characters?name=${charaName}&owner=${id}`);

}

//Create Character
export const charaCreate = async (data) =>{
  return await axios.post('http://localhost:3000/characters/', data);

}

//Update Character
export const updateCharacter = async (body, charaName, id) => {

  console.log(body)
  return await axios.put(`http://localhost:3000/characters?name=${charaName}&owner=${id}`, body);

}