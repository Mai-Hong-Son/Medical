import axios from 'axios';
import types from './actions/serviceApi/types';
export function buildHeaders(state) {
  const { tokenAccess: { data: { data: { token } } } = {} } = state || {};
  const bearerToken = token != null ? `Bearer ${token}` : undefined;

  return {
    Accept: 'application/json',
    Authorization: bearerToken,
    'Content-Type': 'application/json'
  };
}
export const handleRequest = (api, success, failure) => {
  axios(api).then(response => {

    if (response.status === 200) {
      success(response.data)
    }
    else {
      var err_object = {
        error: response.data.error,
        msg: response.data.msg
      }
      failure(err_object);
    }
  })
    .catch(err => {
      var data = [];
      data['status'] = -1;
      failure(data);
    });
}

export const loading = (typeObject) => {
  return {
    type: types.LOADING,
    typeObject: typeObject
  }
}
export const fail = (err, typeObject) => {
  return {
    type: types.FAIL,
    typeObject,
    err
  }
};
export const success = (data, typeObject, keyData) => {
  return {
    type: types.SUCCESS,
    data,
    typeObject,
    keyData
  }
};

export function reducer(state, action, callSuccess, callFail) {
  if (action.typeObject !== state.typeObject) {
    return state
  } else {
    switch (action.type) {
      case types.LOADING:
        return {
          ...state,
          isLoading: true,
          isLoaded: false
        }
      case types.SUCCESS:
        if (callSuccess) {
          return callSuccess(state, action);
        } else {
          return {
            ...state,
            isLoading: false,
            isLoaded: true,
            data: action.data
          }
        }
      case types.FAIL:
        return {
          ...state,
          err: action.err,
          isLoading: false,
          isLoaded: true,
        }
      default: return state
    }
  }
}
export const createInitalState = (typesReducer, dataTypeMap) => {
  return {
    isLoading: false,
    isLoaded: false,
    data: (dataTypeMap) ? dataTypeMap : null,
    err: null,
    typeObject: typesReducer
  }
}


