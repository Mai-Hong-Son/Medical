import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getchitietthuoc = thuocId => {
  const action = createAction('GET_CHI_TIET_THUOC');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `/cong_tra_cuu_thuoc/thong_tin_thuoc?id=${thuocId}`
    };

    dispatch(action({ request }));
  };
};
