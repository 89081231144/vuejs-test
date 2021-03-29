import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    storageName: 'savedTable',
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });
      try {
        const { data } = await api.getPayments(params);
        if (Array.isArray(data)) {
          commit('setState', { data });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
    setCache({ state: { data, storageName }, commit }) {
      localStorage.setItem(storageName, JSON.stringify({ data }));
      commit('setState', { isCached: true });
    },
    resetCache({ state: { storageName }, commit }) {
      localStorage.removeItem(storageName);
      commit('setState', { isCached: false });
    },
    checkCash({ state: { storageName }, commit }) {
      const isCached = localStorage.getItem(storageName) != null;
      commit('setState', { isCached });
    },
    useCachsedData({ state: { storageName }, commit }) {
      const { data = [] } = JSON.parse(localStorage.getItem(storageName));
      commit('setState', { data });
    },
  },

  getters: {
    getData(state) {
      return state.data;
    },
  },
});
