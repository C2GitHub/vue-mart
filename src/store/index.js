import Vue from 'vue';
import Vuex from 'vuex';
import us from '../server/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    setLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {
    login({ commit }, user) {
      return us.login(user)
        .then((res) => {
          const { code, token } = res.data;
          if (code) {
            // 用户登陆成功
            commit('setLogin', true);
            localStorage.setItem('token', token);
          }
          return code;
        });
    },
    logout({ commit }) {
      // 清除缓存
      localStorage.removeItem('token');
      // 修改登录状态
      commit('setLogin', false);
    },
  },
  modules: {
  },
});
