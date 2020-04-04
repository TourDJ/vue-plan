import App from '../App'
import { UserLayout, BasicLayout } from '@/layout'
import { bxAnaalyse } from '@/core/icons'

export const basicRouters = [{
	path: '/',
	name: "index",
	component: App,
  meta: { title: '首页' },
  redirect: '/dashboard/workplace',
	children: [
		{
			path: 'dashboard',
			name: 'dashboard',
			component: BasicLayout,
			redirect: '/dashboard/workplace',
      meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
			hidden: true,
			children: [
				{
					path: 'workplace',
					name: 'workplace',
					component: () => import('../view/Workplace')
				}
			]
		}
	]
}]

export const userRouters = [
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
