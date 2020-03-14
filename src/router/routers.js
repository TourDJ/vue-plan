import App from '../App'
import index from '../view/index.vue'

const routers = [{
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

export default routers