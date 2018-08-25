import './lazyLoading';

function loadComponent (view, index = false) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}${index ? '/index' : ''}.vue`)
}
function loadPage (view, index = false) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/pages/${view}${index ? '/index' : ''}.vue`)
}
export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404',
    },
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: loadPage('NotFound'),
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: loadPage('Deny'),
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: loadPage('Error'),
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: loadComponent('auth/AuthLayout')

  },
  {
    path: '/',
    meta: { },
    name: 'Root',
    redirect: {
      name: 'Dashboard',
    },
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true, requiresAuth: true },
    name: 'Dashboard',
    component:loadPage('Dashboard.vue'),
  },
  {
    path: '/openregis',
    meta: { breadcrumb: true, requiresAuth: true },
    name: 'Openregister',
    component:loadComponent('sale/openregis'),
  },
  {
    path: '/products',
    meta: { breadcrumb: true, requiresAuth: true },
    name: 'productcontrol',
    component:loadComponent('products/ProductLayout'),
    children: [
      {
        path: '/products/product',
        meta: { breadcrumb: true, requiresAuth: true, root: 'productcontrol' },
        name: 'product',
        component:loadComponent('products/product'),
      },
      {
        path: '/products/orderproduct',
        meta: { breadcrumb: true, requiresAuth: true, root: 'productcontrol' },
        name: 'orderproduct',
        component:loadComponent('products/orderproduct'),
      },

      {
        path: '/products/orderproductsub',
        meta: { breadcrumb: true, root: 'productcontrol', requiresAuth: true, transitionName: 'slide' },
        name: 'orderproductsub',
        component:loadComponent('products/orderproductsub'),
      },


    ],
  },
  // { transitionName: 'slide'
  //   path: '/calendar',
  //   meta: { breadcrumb: true },
  //   name: 'Calendar',
  //   component: (a) => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/Calendar.vue`
  //   )
  // },

];
