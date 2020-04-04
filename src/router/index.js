import Vue from 'vue'
import Router from 'vue-router'
import { userRouters } from './routers'
import { routerMode } from '@/config/env'

Vue.use(Router)

const router = new Router({
	routes: userRouters,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production'
})

export default router