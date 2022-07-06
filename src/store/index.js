import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projectInfo: [],
    userInfo: localStorage.getItem('userinfo') || ''
  },
  getters: {},
  mutations: {
    changeInfo(state, info) {
      state.projectInfo = info;
      console.log('ok');
    },
  },
  actions: {},
  modules: {},
});
