import * as React from 'react';
import {BASE_URL} from '../services/Apis';
const ApiCall = async (Url, Method, Data) => {
  let CompleteUrl = BASE_URL + Url;
  var HeaderToken = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
      console.log('responseJson  : ----- ', responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log('---------------Api error: ' + error);
      return {message: error, status: 'false'};
    });
};
export default ApiCall;
