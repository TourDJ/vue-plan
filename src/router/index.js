import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/components/index.vue'

Vue.use(VueRouter)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})