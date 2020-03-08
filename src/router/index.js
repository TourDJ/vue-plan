import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: 'history',
	strict: process.env.NODE_ENV !== 'production'
})

export default router