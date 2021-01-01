import axios from 'axios';

const customInstance = axios.create ({
    baseURL : 'https://jumga.herokuapp.com/api/v1',
    headers: {'Accept': 'application/json'}
  })


export default customInstance;