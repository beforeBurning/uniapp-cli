<template>
	<view class="content">
		<statusBarHeight content='用户登录' backShow></statusBarHeight>

		<view>
			111
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {},
		methods: {
			// 跳转
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="less">

</style>
