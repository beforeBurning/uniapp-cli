import Request from '@/components/luch-request/index.js'
import store from '@/store/index.js';
const http = new Request()
import {
	showToast
} from '@/components/showToast/showToast'

const getToken = () => {
	return store.state.token
}
import {
	login
} from "@/components/login/index.js";

http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = '' /* 根域名不同 */
	config.header = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	return config
})

// 请求前 拦截器
http.interceptors.request.use((config) => {
	login.isLogin();
	/* 请求之前拦截器。可以使用async await 做异步操作 */
	config.header = {
		...config.header,
		'Authorization': `Bearer ${getToken()}`
	}
	return config
}, (config) => {
	return Promise.reject(config)
})

// 请求后 拦截器
http.interceptors.response.use(async (response) => {
	let data = response.data
	if (data.code === 404) {
		showToast(`请求失败 ${data.code}`)
		return false
	}

	if (data.code === 500) {
		// showToast(data.msg)
		return false
	}

	if (data.code === 401) {
		showToast('登录失效')
		login.logOut()
		return false
	}

	if (!data.success || data.code === 201) {
		showToast(data.msg)
		return false;
	}

	if (data.code !== 200) {
		showToast(`请求失败 ${data.code}`)
		return false
	}

	return data
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	return Promise.reject(response)
})

export {
	http
}
