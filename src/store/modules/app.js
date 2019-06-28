import {getLanguage} from '@/i18n/langs/index'
import Cookies from 'js-cookie'

const state = {
  language: getLanguage(),
}
const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
}
const actions = {
  setLanguage({commit}, language) {
    commit('SET_LANGUAGE', language)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
