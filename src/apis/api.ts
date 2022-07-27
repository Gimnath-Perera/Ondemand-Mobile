import Axios, {AxiosError, AxiosRequestConfig} from 'axios';

import {store} from '../store/store';
import {startLoading, endLoading} from '../actions/common.action';
import {setRefreshAndAuthToken} from '../actions/user.actions';

// const BASE_URL = 'https://ondemand-dev.herokuapp.com';
const BASE_URL = 'http://192.168.1.102:5000';
interface IRequest {
  url?: string;
  data?: object;
  params?: object;
  action: string;
  guest?: boolean;
  isFormData?: boolean;
  hideLoader?: boolean;
  method?: AxiosRequestConfig['method'];
  headers?: AxiosRequestConfig['headers'];
}

const createPath = (action: string) => {
  const url = `${BASE_URL}${action}`;

  return {url};
};

const getRefreshToken = async (data: any) => {
  const authToken = getAuthToken();

  try {
    Axios.defaults.headers.common['Authorization'] = authToken;
    const res = await Axios({
      method: 'post',
      url: `${BASE_URL}/v1/auth/refresh-tokens`,
      data,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const requestQueue = async (originalRequest: any) => {
  try {
    const authToken = getAuthToken();

    originalRequest._queued = true;
    originalRequest.headers.Authorization = authToken;

    const res = await Axios(originalRequest);
    return res;
  } catch (error) {
    throw error;
  }
};

const onAxiosResponseFail = async (error: AxiosError) => {
  const {config, response} = error;
  const originalRequest = config;
  let refresh = true;
  if (!response) return Promise.reject(error);

  const responseStatus = response.status;
  //if (responseStatus === 403 || responseStatus === 503) {
  if (responseStatus === 401 || responseStatus === 503) {
    originalRequest._retry = true;
    const {
      auth: {
        refreshToken: {token},
      },
    } = store.getState();
    const data = {
      refreshToken: token,
    };

    if (refresh) {
      const res = await getRefreshToken(data);
      store.dispatch(
        setRefreshAndAuthToken(res, () => {
          refresh = false;
        }),
      );
    }
  } else {
    return Promise.reject(error);
  }

  const requestQueueResponse = await requestQueue(originalRequest);

  return requestQueueResponse;
};

Axios.interceptors.response.use(undefined, onAxiosResponseFail);

const getAuthToken = () => {
  try {
    const {
      auth: {
        token: {token},
      },
    } = store.getState();
    const authToken = `Bearer ${token}`;

    return authToken;
  } catch (error) {
    return null;
  }
};

const request = ({
  url,
  data,
  params,
  action,
  method,
  guest,
  isFormData,
  headers: addHeaders,
}: IRequest) =>
  new Promise((resolve, reject) => {
    store.dispatch(startLoading());
    const headers = {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',

      ...addHeaders,
    };

    if (!guest) {
      const authToken = getAuthToken();
      headers.Authorization = authToken;
    }

    const customUrl = createPath(action);
    const axiosFormDataConfig: AxiosRequestConfig = {
      data,
      params,
      headers,
      timeout: 30000,
      method: method || 'post',
      transformRequest: (formdata, headers) => {
        return data;
      },
      url: url || customUrl.url,
    };

    const axiosConfig: AxiosRequestConfig = {
      data,
      params,
      headers,
      timeout: 30000,
      method: method || 'post',
      url: url || customUrl.url,
    };

    Axios(isFormData ? axiosFormDataConfig : axiosConfig)
      .then(response => {
        resolve(response.data);
        store.dispatch(endLoading());
      })
      .catch(error => {
        store.dispatch(endLoading());
        reject(error?.response?.data || error);
      });
  });

export default {request};
