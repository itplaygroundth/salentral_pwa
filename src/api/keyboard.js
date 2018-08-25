
let events = [{
  route: 'home',
  listen: [{
    key: 70,
    name: 'foo'
  }, {
    key: 66,
    name: 'bar'
  }]
}, {
  route: 'foo',
  listen: [{
    key: 72,
    name: 'home'
  }, {
    key: 66,
    name: 'bar'
  }]
}, {
  route: 'bar',
  listen: [{
    key: 70,
    name: 'foo'
  }, {
    key: 72,
    name: 'home'
  }]
}];

let checkEvent = function checkEvent (e, route) {
  let r = events.find(function (a) {
    return a.route === route;
  }, this);
  if (typeof r !== 'undefined') {
    let match = r.listen.find(function (a) {
      return a.key === e;
    }, this);
    if (typeof match !== 'undefined' && Object.prototype.hasOwnProperty.call(match, 'name')) {
      return match.name;
    }
  }
  return null;
};

// let Home = {
//   template: '<div class="Component"><div class="Component--legend">I\'m the Home component !<br>This means that the current route is / aka home.</div><div class="Component--tip">Tip : use F to navigate to Foo, use B to navigate to Bar</div></div>'
// };

// let Foo = {
//   template: '<div class="Component Component__foo"><div class="Component--legend">I\'m the Foo component !<br>This means that the current route is /foo aka foo.</div><div class="Component--tip">Tip : use H to navigate to Home, use B to navigate to Bar</div></div>'
// };

// let Bar = {
//   template: '<div class="Component Component__bar"><div class="Component--legend">I\'m the Bar component !<br>This means that the current route is /bar aka bar.</div><div class="Component--tip">Tip : use F to navigate to Foo, use H to navigate to Home</div></div>'
// };

// let routes = [{
//   path: '/',
//   component: Home,
//   name: 'home'
// }, {
//   path: '/foo',
//   component: Foo,
//   name: 'foo'
// }, {
//   path: '/bar',
//   component: Bar,
//   name: 'bar'
// }];

// let router = new VueRouter({
//   routes: routes
// });

// let app = new Vue({
//   router: router,
//   components: {
//     Home: Home,
//     Foo: Foo,
//     Bar: Bar
//   }
// }).$mount('#app');

// let keyCapture = function keyCapture (e) {
//   let currentRoute = app.$route.matched[0];
//   if (currentRoute !== null) {
//     let r = checkEvent(e.which, currentRoute.name);
//     if (r !== null) {
//       app.$router.push({
//         name: r
//       });
//     }
//   }
// };

window.addEventListener('keyup', function (e) {
  if (e.target.getAttribute('data-keylogic-prevent')) {
    return;
  }
  // keyCapture(e);
}, false);