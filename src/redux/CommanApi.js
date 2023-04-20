import * as React from 'react';
import {BASE_URL} from '../services/Apis';
const ApiCall = async (Url, Method, Data) => {
  let CompleteUrl = BASE_URL + Url;
  var HeaderToken = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization:
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQzZWE0NTVhZWU1MzkwN2YwMjcwMTg3IiwidXNlcm5hbWUiOiJ2aWthcy5ndXB0YTVAdGhpbmtiYXIuaW4iLCJpYXQiOjE2ODE4MjY5MDEsImV4cCI6MTY4MjQzMTcwMX0.feT3-dcdfv2kPbwyh5xNiEHDKWPm1ofh0XUmL9ppaFg',
  };
  console.log('HeaderToken  : ----- ', HeaderToken);
  console.log('Url  : ---- ', CompleteUrl);
  console.log('Method  : ----- ', Method);
  console.log('apiData  : ------', Data);
  return fetch(CompleteUrl, {
    body: Data,
    method: Method,
    headers: HeaderToken,
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      // console.log('responseJson  : ----- ', responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log('---------------Api error---: ' + error);
      return {message: error, status: 'false'};
    });
};
export default ApiCall;
