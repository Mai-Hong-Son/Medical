import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import axiosMiddleware from './axiosMiddleware';

import { middleware } from './../../app/components/AppNavigator/index';
import { navReducer, mainRouter } from './../../app/components/AppNavigator/reducer';
import {
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
} from './../reducers/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function buildStore() {
  const reducers = combineReducers({
    navReducer,
    mainRouter,
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
  });

  const store = createStore(reducers, composeEnhancer(applyMiddleware(reduxThunk, axiosMiddleware, middleware)));

  return { store };
}
