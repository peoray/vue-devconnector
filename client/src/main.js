import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
import moment from 'moment'
import jQuery from './../node_modules/jquery/dist/jquery.min.js'
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'

global.jQuery = jQuery
global.$ = jQuery

Vue.prototype.moment = moment

// Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
