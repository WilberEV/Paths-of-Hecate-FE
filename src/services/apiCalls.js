import axios from 'axios';


//Login user
export const logInAccount = async (credentials) => {

  return await axios.post('http://localhost:3000/user/login', credentials)
}

//Create new user
export const userSignUp = async (credentials) =>{

  return await axios.post('http://localhost:3000/user/', credentials);

}
