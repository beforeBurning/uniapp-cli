<template>
	<!-- 自定义页头 -->
	<div class="statusBarHeight" :style="height">
		<div>
			<div :class="left ? 'ev topToBottom' : 'ev leftToRight'" :style="statusBarHeight"></div>
			<div class="backBtn" :style="statusBarHeight">
				<image src="/static/prev.svg" class="prev" alt="" mode="widthFix" @click="back" v-if="backShow"></image>
				<span :class="center ? 'center' : (backShow ? 'paddleft' : '')" @click="backContent">{{content}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: '',
				height: ''
			};
		},
		beforeMount() {
			wx.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = 'padding-top:' + res.statusBarHeight + 'px'
					this.height = 'height:' + (res.statusBarHeight * 1 + 44) + 'px'
				}
			})
		},
		methods: {
			back() {
				wx.navigateBack({
					delta: 1
				})
			},
			backContent() {
				if (this.backShow) {
					wx.navigateBack({
						delta: 1
					})
				}
			}
		},
		/**
		 * backShow:返回按钮展示
		 * content:页头文字
		 * center:是否居中
		 * left:默认靠左
		 * */
		props: ["backShow", "content", 'center', 'left']
	}
</script>

<style scoped>
	.statusBarHeight>div {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 5;
	}

	.ev {
		width: 100%;
		height: 44px;
		position: absolute;
		z-index: -1;
	}

	.topToBottom {
		background: linear-gradient(180deg, #68A3EB 0%, #2B66A1 100%);
	}

	.leftToRight {
		background: url("/static/header.png") no-repeat bottom left;
		background-size: 100% 100%;
	}

	.backBtn {
		position: absolute;
		left: 0;
		z-index: 1;
		color: #fff;
		padding-left: 30rpx;
		margin-top: 10px;
		display: flex;
		align-items: center;
	}

	.paddleft {
		padding-left: 40rpx;
	}

	.backBtn image {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		vertical-align: top;
		margin-right: 5px;
	}

	.backBtn span:nth-of-type(1) {
		font-size: 34rpx;
		vertical-align: top;
	}

	.center {
		text-align: center;
		width: 700rpx;
		display: inline-block;
	}
</style>
