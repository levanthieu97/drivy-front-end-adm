import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import global from 'modules/global/store';
import login from 'modules/login/store';
import register from 'modules/register/store';
import dashboard from 'modules/dashboard/store';
import SUPPLIER_STORES from './supplier-system';

Vue.use(Vuex);

const DEFAULT_STORES = {
  global,
  register,
  dashboard,
  login
};

const modules = _.cloneDeep(DEFAULT_STORES);
_.assign(modules, SUPPLIER_STORES);

export default new Vuex.Store({
  modules
});
