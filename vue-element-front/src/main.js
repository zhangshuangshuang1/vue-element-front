

import Vue from 'vue'

import App from './App'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'





import routes from '@/router'










Vue.use(ElementUI)

Vue.use(VueRouter)




//NProgress.configure({ showSpinner: false });



const router = new VueRouter({

  routes

})




new Vue({

  //el: '#app',

  //template: '<App/>',

  router,


  //components: { App }

  render: h => h(App)

}).$mount('#app')