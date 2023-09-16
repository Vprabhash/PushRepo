import {BASE_URL} from '../services/Apis';
import {getData} from '../Components/Helper';

const ApiCall = async (url, method, data) => {
  try {
    const authToken = await getData('userToken');
    const completeUrl = BASE_URL + url;
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type':
        data instanceof FormData ? 'multipart/form-data' : 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const requestOptions = {
      method: method,
      headers: headers,
    };

    if (data) {
      requestOptions.body = data;
    }

    console.log('headerToken:', headers);
    console.log('url:', completeUrl);
    console.log('Method:', method);
    if (data) {
      console.log('apiData:', data);
    }

    const response = await fetch(completeUrl, requestOptions);
    const responseJson = await response.json();
    console.log('responseJson:', responseJson);

    return responseJson;
  } catch (error) {
    console.error('api error:', error);
    return {message: error, status: false, ok: false};
  }
};

export default ApiCall;
