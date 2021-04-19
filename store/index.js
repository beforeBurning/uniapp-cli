import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import storage from '@/components/storage/index.js'

const store = new Vuex.Store({
	state: {
		token: '',
		userInfo: [],
	},
	mutations: {
		login(state, provider) {
			state.token = provider.token;
			storage.set('token', provider.token)
			state.userInfo = provider.userInfo
			storage.set('userInfo', provider.userInfo)
		},
		token(state, provider) {
			state.token = provider;
			storage.set('token', provider)
		},
		userInfo(state, provider) {
			state.userInfo = provider;
			storage.set('userInfo', provider)
		}
	},
	getters: {
		getToken: state => {
			let token = ''
			if (!state.token && storage.get('storage')) {
				state.token = storage.get('storage')
			}
			return state.token
		}
	}
})

export default store
