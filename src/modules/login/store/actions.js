import {
  SET_USER,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_ERROR,
  SET_MESSAGE,
  USER_ROLE,
  SUPPLIER_PRODUCT
} from './types';
import LoginService from 'modules/login/store/service';
import ServiceToken from 'core/service';
import router from 'router';
import { ACCESS_TOKEN_KEY, USER, ROLE, SUP } from 'core/constants';

const service = new LoginService();

export const login = async ({ commit }, payload) => {
  let resp = await service.login(payload);
  // console.log(resp.data.role);

  if (resp != null && resp.success) {
    if (resp.data.role === 'ROLE_USER') {
      router.push('/login');
    } else {
      localStorage.setItem(ACCESS_TOKEN_KEY, resp.data.token);
      localStorage.setItem(ROLE, JSON.stringify(resp.data.role));
      localStorage.setItem(USER, JSON.stringify(resp.data.user_info));
      ServiceToken.setToken(resp.data.token);
      commit(SET_USER, resp.data.user_info);
      authSuccess({ commit }, resp.data.token);
      commit(USER_ROLE, resp.data.role);
      router.push('/');
    }
  } else {
    localStorage.clear();
    ServiceToken.removeToken();
    commit(AUTH_ERROR, false);
    commit(
      SET_MESSAGE,
      resp == null
        ? 'Can not connect to server. Please check your network!'
        : resp.message
    );
  }
};

export const createSupplier = async (dispatch, params) => {
  const result = await service.createSupplier(params);
  return result;
};

export const confirmSupplier = async (dispatch, param) => {
  const result = await service.confirmEmail(param);
  return result;
};

export const getSupplier = async ({ commit }, params) => {
  const result = await service.getSupplier(params);
  if (result.data !== null) {
    localStorage.setItem(SUP, JSON.stringify(result.data.supplier_profile_id));
    commit(SUPPLIER_PRODUCT, result.data.supplier_profile_id);
  }
  return result;
};

export const authSuccess = ({ commit }, token) => {
  commit(AUTH_SUCCESS, { token });
};

export const logout = ({ commit }) => {
  return new Promise(resolve => {
    commit(AUTH_LOGOUT);
    localStorage.clear();
    ServiceToken.removeToken();
    router.push('/login');
    resolve();
  });
};
