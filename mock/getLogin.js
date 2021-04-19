export const getLogin = tabCurrent => {
	return new Promise((resolve, reject) => {
		let str = {
			"success": true,
			"code": 200,
			"msg": "错误提示!",
			"data": {
				"token": "123123123",
				// 是否验证过身份
				"is_pic": false,
				// hb最小值
				"small": "110",
				"userInfo": {
					"phone": '175****6542',
					"hospitalId": '1',
					"hospital": '北京市地坛医院',
					"qrCode": "http://192.168.0.141/qrcode.html?hospital_id=29"
				}
			}
		}
		resolve(str)
	})
}
