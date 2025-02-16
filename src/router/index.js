'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

import store from 'store';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  routes
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'TP Shop';
  NProgress.start();
  store.dispatch('global/setLoading', false);

  let isLoginPage = to.matched.some(p => p.path.indexOf('/login') === 0);
  let isRegisTer = to.matched.some(p => p.path.indexOf('/register') === 0);
  let check = to.matched.some(p => p.path.indexOf('/check') === 0);

  try {
    let isAuthenticated = store.getters['login/isAuthenticated'];
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    let role = store.getters['login/role'];

    if (!requiresAuth) {
      if (isLoginPage && isAuthenticated) return next('/');
      return next();
    }

    if (isRegisTer && !requiresAuth) {
      return next('/login');
    }

    if (requiresAuth && !isAuthenticated) {
      if (isLoginPage) return next();
      return next('login');
    } else next();
  } catch (err) {
    if (isLoginPage) return next();
    next('login');
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
