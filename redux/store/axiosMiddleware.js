import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import _ from 'lodash';

const axiosClient = axios.create({
  baseURL: 'https://duocquocgia.com.vn/api',
  responseType: 'json'
});

export default axiosMiddleware(axiosClient, {
  errorSuffix: ':ERROR',
  interceptors: {
    response: [{
      error: (configs, request) => {
        const { dispatch } = configs;
        const message = request.message;

        return Promise.reject({ ...request, message });
      },
      success: (configs, request) => {
        const { config: { logging } = {} } = request;
        // if (logging) Logger.debug(request);
        return request;
      }
    }]
  },
  successSuffix: ':SUCCESS'
});
