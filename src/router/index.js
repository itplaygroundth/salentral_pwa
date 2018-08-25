import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
// import store from './../store';
// import 'nprogress/nprogress.css';
// import { get } from '../../node_modules/vuex-pathify';


Vue.use(Router);
const router = new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths,
});


// router gards
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // .getItem('token'));
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') === '' || localStorage.getItem('token') === null) { // .getItem('token')) {
      // console.log(localStorage);
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
