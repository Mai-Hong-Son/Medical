import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getdanhmucthuoc = () => {
  const action = createAction('GET_DANH_MUC_THUOC');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/cong_tra_cuu_thuoc/danh_muc_thuoc'
    };

    dispatch(action({ request }));
  };
};
