import { createAction } from 'redux-actions';

export const login = account => {
  const action = createAction('LOGIN');

  return dispatch => {
    const request = {
      data: account,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/tai_khoan/dang_nhap'
    };

    dispatch(action({ request, client: 'default' }));
  };
}
;
