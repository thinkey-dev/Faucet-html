
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import utils from './utils/index'
import i18n from './i18n/langs';
import Cookies from 'js-cookie'
import store from './store'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(utils)
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
