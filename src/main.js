import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import routes from './routes'
import toastr from 'vue-toastr'

Vue.use(VueRouter);
Vue.use(VueAxios,axios);
Vue.use(toastr);

Vue.config.productionTip = false
const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.filter('limitCharachter', function (value, args) {
  return (value.slice(0,args) + '...')
})


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
