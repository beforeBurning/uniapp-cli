export const showToast = (title, icon) => {
	if (!icon) {
		icon = 'none'
	}
	uni.showToast({
		title: title,
		icon: icon,
		duration: 2000
	});
}
