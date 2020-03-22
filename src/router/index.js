import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const router = new Router({
	routes,
	mode: 'history',
	strict: process.env.NODE_ENV !== 'production'
})

export default router