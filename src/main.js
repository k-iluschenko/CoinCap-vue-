import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Coin from './Coin.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/coin/:id', name: 'coin', component: Coin },
    { path: '/', name: 'app', component: App }
  ]
});

// new Vue({
//   router
// }).$mount('#app');

new Vue({
  el: '#app',
  router
  // template: '<App/>',
  //components: { App }
});
