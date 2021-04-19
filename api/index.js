/**
 * 商品相关api
 */
import {
	http
} from '@/api/service.js'

// post
export const getCode = data => {
	return http.middleware({
		method: 'POST',
		url: '/v1/user/sms',
		data: data,
	})
}

// updata
export const upload = (file, data) => {
	return http.upload('/v1/user/upload', {
		filePath: file,
		name: 'file',
		data: data,
		formData: data,
	})
}

// get
export const settlement = data => {
	return http.get('/v1/app/settlement', {
		data
	})
}
