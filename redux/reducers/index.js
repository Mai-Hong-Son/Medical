import { tokenAccess } from './auth';
import { thuocmoicapnhat } from './serviceApi/thuocmoicapnhat';
import { truyxuathoadon } from './serviceApi/truyxuathoadon';
import { ketquatimkiem } from './serviceApi/timkiemthuoc';
import { getdanhmucthuoc } from './serviceApi/getdanhmucthuoc';
import { ketquachitietthuoc } from './serviceApi/ketquachitietthuoc';
import { ketquatruyxuathandung } from './serviceApi/ketquatruyxuathandung';
import { thuoctheoloai } from './serviceApi/thuoctheoloai';
import { ketquacanhbaothuoc } from './serviceApi/ketquacanhbaothuoc';
import { ketquaguiphanhoi } from './serviceApi/ketquaguiphanhoi';

import dataCategori from './serviceApi/dataCategori';
import dataPosts from './serviceApi/dataPosts';
import dataPharmacy from './serviceApi/dataPharmacy';
import dataDetailPharmacy from './serviceApi/dataDetailPharmacy';
import dataLocation from './serviceApi/dataLocation';
import dataResultPharmacy from './serviceApi/dataResultPharmacy';
import dataDetailPost from './serviceApi/dataDetailPost';
const statusBack = (state = null, action) => {
  if (action.type === 'Navigation/BACK') {
    return Date.now();
  }
  return state;
};

export {
  tokenAccess,
  thuocmoicapnhat,
  truyxuathoadon,
  ketquatimkiem,
  getdanhmucthuoc,
  ketquachitietthuoc,
  ketquatruyxuathandung,
  thuoctheoloai,
  ketquacanhbaothuoc,
  ketquaguiphanhoi,
  statusBack,
  dataCategori,
  dataPosts,
  dataPharmacy,
  dataDetailPharmacy,
  dataLocation,
  dataResultPharmacy,
  dataDetailPost
};
