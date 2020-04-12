import Vue from 'vue'
import Vuex from 'vuex'
import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'
import plugins from './plugins'

import user from './user'
import app from './app'
import permission from './permission'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		app,
		permission
	},
  // state: {
  //   todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  // },
  // actions,
  // mutations,
  plugins,
  getters
})
