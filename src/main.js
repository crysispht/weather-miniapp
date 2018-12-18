import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import Fly from 'flyio/dist/npm/wx'
import _ from 'lodash/core'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false

/* app-only-begin */
Vue.prototype.$http = new Fly()
Vue.prototype.$_ = _
/* app-only-end */

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
