import {BASE_URL} from '../services/Apis';
import {getData} from '../Components/Helper';
const ApiCall = async (Url, Method, Data) => {
  let authToken = await getData('userToken');
  console.log('authToken', authToken);
  let CompleteUrl = BASE_URL + Url;
  var headers = new Headers();
  headers.append('Accept', 'application/json');
  Data instanceof FormData?
  headers.append('Content-Type', 'multipart/form-data'):
  headers.append('Content-Type', 'application/json');

  headers.append('Authorization', 'Bearer ' + authToken);

  console.log('HeaderToken  : ----- ', headers);
  console.log('Url  : ---- ', CompleteUrl);
  console.log('Method  : ----- ', Method);
  console.log('apiData  : ------', Data);
  let body = {
    method: Method,
    headers: headers,
  };
  if (Data) {
    body.body = Data;
  }
  return fetch(CompleteUrl, body)
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
