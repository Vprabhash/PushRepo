import axios from 'axios';
import {BASE_URL} from './Apis';
import {getData} from '../Components/Helper';

const getAuthToken = async () => {
  let token = await getData('userToken');
  return token;
};
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getAuthToken(),
  },
});

export default api;
