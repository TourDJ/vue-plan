import Vue from 'vue'
import router from './router'
import store from './store'
import service from './service'

import '@/core/AntDesign'
import '@/core/lazyPlugin'
import '@/core/permission' // permission control
import '@/components/global.less'

import moment from 'moment'; 
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');

Vue.config.productionTip = false

Vue.prototype.$service = service

/*
*	main.js自动注入到了index.html里
*/
new Vue({
	router,
	store
}).$mount('#app')
