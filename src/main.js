import Vue from 'vue'
import router from './router'
import store from './store'
import service from './service'

import '@/core/AntDesign'
import '@/components/global.less'

Vue.config.productionTip = false

Vue.prototype.$service = service

/*
*	main.js自动注入到了index.html里
*/
new Vue({
	router,
	store
}).$mount('#app')
