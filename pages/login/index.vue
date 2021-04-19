<template>
	<view class="content">
		<statusBarHeight content='用户登录'></statusBarHeight>

		<view class="form">
			<view class="phone">
				<input type="text" v-model="phone" maxlength="11" placeholder="请输入手机号">
				<i v-if="phone.length !== 0"></i>
			</view>
			<label class="code">
				<input placeholder="请填写验证码" v-model="code" type="number" maxlength="4">
				<em @click="getCode">{{!seconds ? '获取验证码' : `${seconds}秒`}}</em>
			</label>

			<view class="terms" @click="isScroll = true">
				<i :class="isScroll ? 'success successIcon' : ''"></i>
				<p>我已阅读并同意<em>《用户知情同意书》</em>相关条款</p>
			</view>

			<section class="formSubmit" @click="submit">
				<p>立即登录</p>
			</section>

		</view>

	</view>
</template>

<script>
	import {
		showToast
	} from '@/components/showToast/showToast'
	import {
		login
	} from '@/components/login/index.js'
	import {
		getLogin
	} from '@/api/index.js'

	export default {
		data() {
			return {
				phone: '17551111111',
				code: '1234'
			}
		},
		mounted() {},
		methods: {
			// 正则
			isPhone(str) {
				const reg = /^1[3456789]\d{9}$/
				return reg.test(str)
			},
			isCode(str) {
				const reg = /^[0-9]{4}$/
				return reg.test(str)
			},
			// 倒计时
			countdown() {
				this.seconds = 60
				this.timer = setInterval(() => {
					if (this.seconds >= 1) {
						this.seconds = this.seconds - 1
					} else {
						this.seconds = 0
						clearInterval(this.timer)
						this.timer = null
					}
				}, 1000)
			},
			// 获取code
			getCode() {
				let phone = this.phone
				if (!this.isPhone(phone)) {
					showToast('手机号不正确')
					return false
				}
				this.countdown();
			},

			// 登录
			submit() {
				let phone = this.phone
				let code = this.code
				if (!this.isPhone(phone)) {
					showToast('手机号不正确')
					return false
				}
				if (!this.isCode(code)) {
					showToast('验证码不正确')
					return false
				}
				uni.navigateTo({
					url: '/pages/index/index'
				})
				// login.login(res.data)
			}
		}
	}
</script>

<style lang="less">

</style>
