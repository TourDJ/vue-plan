import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { routerMode } from '@/config/env'

Vue.use(Router)

const router = new Router({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production'
})

export default router