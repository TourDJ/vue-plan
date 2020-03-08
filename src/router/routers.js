import App from '../App'
import index from '../view/index.vue'
// const index = r => require.ensure([], () => r(require('../view/index')), 'index')

const routers = [{
	path: '/',
	component: index
}]
console.log(index)
export default routers