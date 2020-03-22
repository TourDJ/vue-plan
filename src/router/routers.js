import App from '../App'
import index from '../view/index.vue'
import { UserLayout } from '@/layout'

const basicRouters = [{
	path: '/',
	component: App,
	children: [
		{
			path: "",
			redirect: "/index"
		},
		{
			path: "/index",
			component: index
		}
	]
}]

const userRouters = [
	{
		path: '/user',
		component: UserLayout,
		redirect: '/user/login',
		hidden: true,
		children: [
			{
				path: 'login',
				name: 'login',
				component: () => import('../view/user/Login')
			},
			// {
			// 	path: 'register',
			// 	name: 'register',
			// 	component: () => import('@/view/user/Register')
			// },
			// {
			// 	path: 'register-result',
			// 	name: 'registerResult',
			// 	component: () => import('@/view/user/RegisterResult')
			// },
			{
				path: 'recover',
				name: 'recover',
				component: undefined
			}
		]
	},
	
	// {
	// 	path: '/test',
	// 	component: BlankLayout,
	// 	redirect: '/test/home',
	// 	children: [
	// 		{
	// 			path: 'home',
	// 			name: 'TestHome',
	// 			component: () => import('@/views/Home')
	// 		}
	// 	]
	// },

	// {
	// 	path: '/404',
	// 	component: () => import('@/view/exception/404')
	// }
]

const routers = [...basicRouters, ...userRouters]

export default routers