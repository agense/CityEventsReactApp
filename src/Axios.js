import axios from 'axios';

//Configure axios default instance
const Axios = axios.create({
  baseURL: 'https://localhost:5001/api/',
});

export default Axios;