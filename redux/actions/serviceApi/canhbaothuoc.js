import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const canhbaothuoc = ({
  ten_thuoc,
  so_dang_ky,
  so_lo,
  noi_dung,
  ly_do,
  ho_ten,
  dia_chi_nguoi_gui,
  so_dien_thoai,
  ten_nha_thuoc,
  dia_chi
}) => {
  const action = createAction('CANH_BAO_THUOC');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      data: {
        ten_thuoc,
        so_dang_ky,
        so_lo,
        noi_dung,
        ly_do,
        ho_ten,
        dia_chi_nguoi_gui,
        so_dien_thoai,
        ten_nha_thuoc,
        dia_chi
      },
      method: 'POST',
      headers: buildHeaders(state),
      url: '/cong_tra_cuu_thuoc/canh_bao_thuoc'
    };

    dispatch(action({ request }));
  };
};
