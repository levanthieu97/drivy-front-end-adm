import {
  SET_USER,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  SET_MESSAGE,
  USER_ROLE,
  SUPPLIER_PRODUCT
} from './types';

// import menus from './menus';

import * as getters from './getters';
import * as actions from './actions';
import Menu from './menus';
import { ACCESS_TOKEN_KEY, USER, ROLE, SUP } from 'core/constants';

const state = {
  user: JSON.parse(localStorage.getItem(USER)),
  token: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
  hasLoadedOnce: true,
  message: '',
  menus: Menu,
  role: JSON.parse(localStorage.getItem(ROLE)),
  supplier: JSON.parse(localStorage.getItem(SUP))
};

const mutations = {
  [USER_ROLE](state, role) {
    state.role = role;
  },

  [SET_USER](state, user) {
    state.user = user || {};
  },

  [AUTH_SUCCESS](state, resp) {
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },

  [AUTH_ERROR](state, resp) {
    state.hasLoadedOnce = resp;
  },

  [SUPPLIER_PRODUCT](state, supplier) {
    state.supplier = supplier;
  },

  [AUTH_LOGOUT](state) {
    state.token = '';
  },

  [SET_MESSAGE](state, message) {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
