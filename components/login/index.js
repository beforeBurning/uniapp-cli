import {
	getLogin
} from "@/mock/getLogin.js";
import store from '@/store/index.js';
import storage from '@/components/storage/index.js'
import {
	showToast
} from '@/components/showToast/showToast'
import {
	getUserInfo
} from '@/api/index.js'

export const login = {
	// 判断是否有token
	isLogin() {
		if (!store.state.token) {
			if (!storage.get('token')) {
				return false
			} else {
				store.commit('token', storage.get('token'));
				return true
			}
		}
	},
	// 登录
	login(data) {
		store.commit('login', data);
		if (!data.is_pic) {
			uni.reLaunch({
				url: '/pages/certification/index'
			})
		} else {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}
	},
	// 判断是否上传过资质认证
	certification() {
		let is_pic = store.state.is_pic ? store.state.is_pic : (storage.get('is_pic') ? storage.get('is_pic') : '')
		store.commit('is_pic', is_pic)
		if (!is_pic) {
			uni.reLaunch({
				url: '/pages/certification/index'
			})
		}
	},
	// Hb最小值
	smallHb() {
		let small = store.state.small ? store.state.small : (storage.get('small') ? storage.get('small') : '')
		if (!small) {
			getUserInfo({
				is_type: 1
			}).then(res => {
				if (res) {
					store.commit('small', res.data.small)
					store.commit('userInfo', res.data.userInfo)
				}
			})
		} else {
			store.commit('small', small)
		}
	},
	// 用户数据
	userInfo() {
		let userInfo = JSON.stringify(store.state.userInfo) !== '[]' ? store
			.state.userInfo : (storage.get('userInfo') ? storage.get('userInfo') : '');
		if (!userInfo || JSON.stringify(userInfo) === '[]') {
			getUserInfo({
				is_type: 1
			}).then(res => {
				if (res) {
					store.commit('small', res.data.small)
					store.commit('userInfo', res.data.userInfo)
				}
			})
		} else {
			store.commit('userInfo', userInfo)
		}
	},
	// 退出登录  
	logOut() {
		store.commit('token', '');
		storage.remove('token');
		uni.reLaunch({
			url: '/pages/login/index'
		})
	},
}
