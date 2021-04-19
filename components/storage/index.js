// 存储
const storage = {
	get(key) {
		return uni.getStorageSync(key);
	},
	set(key, data) {
		uni.setStorageSync(key, data);
	},
	remove(key) {
		uni.removeStorageSync(key)
	}
}

export default storage
