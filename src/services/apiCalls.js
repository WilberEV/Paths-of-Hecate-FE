import axios from 'axios';

export const logInAccount = async (credentials) => {

  return await axios.post('http://localhost:3000/user/login', credentials)
}
