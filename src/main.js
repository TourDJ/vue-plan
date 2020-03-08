// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

/*
*	main.js自动注入到了index.html里，同时main.js也把App.vue组件的内容引入到index.html里了
* render: h => h(App) 等价于:
* 	render: function (App) {
*  		return createElement(App)
*		}
* */
new Vue({
	router,
	store,
	// render: h => h(App),
  components: { App },
  template: '<App/>'
}).$mount('#app')
