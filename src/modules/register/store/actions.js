import RegisterService from './service';
import { SET_MESSAGE, SET_SUCCESS } from './types';
import router from 'router';

const service = new RegisterService();

export const registerUser = async ({ commit }, param) => {
  const resp = await service.registerUser(param);
  commit(SET_MESSAGE, resp.message);
  commit(SET_SUCCESS, resp.success);
  if (resp.data.success) {
    router.push('/login');
  } else {
    router.push('/register');
  }
};
