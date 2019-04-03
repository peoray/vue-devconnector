import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router'
import setAuthToken from './auth'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isAuthenticated: false,
    profile: null,
    profiles: null,
    loading: false,
    errors: {}
  },
  mutations: {
    SET_ERRORS(state, errors) {
      state.errors = errors;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_PROFILES(state, profiles) {
      state.profiles = profiles;
    },
    SET_PROFILE(state, profile) {
      state.profile = profile;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    registerUser(context, payload) {
      axios
        .post('/api/users/register', payload)
        .then(response => {
          context.commit('SET_USER', response.data)
          router.push('/login')
        })
        .catch(error => {
          context.commit('SET_ERRORS', error.response.data)
        });
    },
    loginUser(context, payload) {
      axios.post('/api/users/login', payload)
        .then(response => {
          const { token } = response.data
          localStorage.setItem('jwtToken', token)
          setAuthToken(token)
          const decoded = jwt_decode(token)

          context.commit('SET_USER', decoded)
          context.commit('SET_AUTHENTICATED', true)
          router.push('/dashboard')
        }).catch(error => {
          context.commit('SET_ERRORS', error.response.data)
        })
    },
    logoutUser(context) {
      localStorage.removeItem('jwtToken')
      setAuthToken(false)
      context.commit('SET_USER', {})
      context.commit('SET_PROFILE', null)
      context.commit('SET_AUTHENTICATED', false)
      router.push('/login')
    },
    getUserProfile(context) {
      return new Promise((resolve, reject) => {
        context.commit('SET_LOADING', true)
        axios.get('/api/profile')
          .then(response => {
            context.commit('SET_PROFILE', response.data)
            context.commit('SET_LOADING', false)
            resolve(response)
          })
          .catch(error => {
            context.commit('SET_LOADING', false)
            context.commit('SET_PROFILE', {})
            reject(error)
          })

      })
    },
    createProfile(context, payload) {
      axios.post('/api/profile', payload)
        .then(response => {
          context.commit('SET_PROFILE', response.data)
          router.push('/dashboard')
        })
        .catch(error => {
          console.log(error)
          context.commit('SET_ERRORS', error.response.data)
        })

    },
    addExperience(context, payload) {
      axios
        .post('/api/profile/experience', payload)
        .then(response => {
          router.push('/dashboard')
        })
        .catch(error => {
          context.commit('SET_ERRORS', error.response.data)
        })
    },
    addEducation(context, payload) {
      axios
        .post('/api/profile/education', payload)
        .then(response => {
          router.push('/dashboard')
        })
        .catch(error => {
          context.commit('SET_ERRORS', error.response.data)
        })
    },
    deleteExperience(context, payload) {
      axios
        .delete(`/api/profile/experience/${payload}`)
        .then(response => {
          context.dispatch('getUserProfile')
        })
        .catch(errror => {
          context.commit("SET_ERRORS", error.response.data)
        })

    },
    deleteEducation(context, payload) {
      axios
        .delete(`/api/profile/education/${payload}`)
        .then(response => {
          context.dispatch('getUserProfile')
        })
        .catch(errror => {
          context.commit("SET_ERRORS", error.response.data)
        })

    },
    deleteAccount(context) {
      if (window.confirm('Are you sure? This cannot be undone!')) {
        axios.delete('/api/profile')
          .then(response => {
            context.dispatch('getUserProfile')
            // context.commit("SET_USER", {})
            // context.commit("SET_AUTHENTICATED", false)
            // window.reload()
          })
          .catch(error => {
            context.commit("SET_ERRORS", error.response.data)
          })
      }
    }
  }
});