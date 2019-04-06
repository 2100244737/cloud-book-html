import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from '../utils/index'
import api from '../utils/api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userMsg: {}
  },
  mutations: {
    'CHANGE_USER_MSG' (state, userMsg) {
      state.userMsg = userMsg
    }
  },
  actions: {
    getUserMsg (context) {
      fetch.get(api.user).then((res) => {
        context.commit('CHANGE_USER_MSG', res.data)
      })
    }
  }

})
export default store
