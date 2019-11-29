import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutation: {
    increment (state) {
      state.count++ 
    }
  }
})
store.commit('increment')
console.log(store.state.count)


export default new Vuex.Store({
  store
})
