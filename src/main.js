import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

/*
*	main.js自动注入到了index.html里
*/
new Vue({
	router,
	store
}).$mount('#app')
