<template>
	<view>
		<view class="lineChartBox">
			<view class="title">
				<text class="left">⽇/周/⽉报告</text>
			</view>
			<view class="lineChart">
				<view class="tab">
					<em @click="tab" data-index="1" :class="tabCurrent === 1 ? 'current' : ''">日报</em>
					<em @click="tab" data-index="2" :class="tabCurrent === 2 ? 'current' : ''">周报</em>
					<em @click="tab" data-index="3" :class="tabCurrent === 3 ? 'current' : ''">月报</em>
				</view>
				<view class="echart">
					<chart chart-class="chart" :width="`${width}rpx`" height="475rpx" :option="echartData" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		lineChartData
	} from "@/components/echart/index.js";
	import {
		collection,
	} from '@/api/index.js'

	export default {
		props: {
			width: {
				type: String,
				default: '750',
			},
		},
		data() {
			return {
				tabCurrent: 1,
				echartData: ''
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			tab(e) {
				let index = parseInt(e.currentTarget.dataset.index)
				if (this.tabCurrent === index) {
					return false
				}
				this.tabCurrent = index
				this.init()
			},
			init() {
				collection({
					is_tag: this.tabCurrent,
					is_type: 1
				}).then(res => {
					if (res) {
						this.echartData = lineChartData(res.data);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.lineChartBox {
		display: flex;
		margin-top: 16rpx;
		background-color: #fff;
		flex-direction: column;

		.title {
			display: flex;
			align-items: center;
			padding-top: 30rpx;
			width: 100%;
			justify-content: space-between;

			.left {
				color: #000000;
				font-size: 30rpx;
				padding-left: 30rpx;
				position: relative;
				align-items: center;

				&::before {
					background: linear-gradient(#9E4779, #C44C91);
					content: "";
					width: 8rpx;
					height: 30rpx;
					position: absolute;
					left: 0;
					top: 10rpx;
				}
			}

			.span {
				display: flex;
				margin-right: 30rpx;

				p {
					display: flex;
					margin-left: 46rpx;
					font-size: 26rpx;
					color: #9BA3AA;

					em {
						color: #C44C91;
						margin-left: 10rpx;
					}

					strong {
						color: #2EC17B;
						margin-left: 10rpx;
					}
				}
			}
		}

		.lineChart {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-bottom: 80rpx;

			.tab {
				display: flex;
				margin: 30rpx 30rpx 0 30rpx;

				em {
					color: #8F0455;
					font-size: 30rpx;
					width: 220rpx;
					height: 72rpx;
					border: 3rpx solid #900455;
					margin-right: 14rpx;
					border-radius: 8rpx;
					align-items: center;
					justify-content: center;
					display: flex;
					box-sizing: border-box;

					&:last-child {
						margin-right: 0;
					}

					&.current {
						background: linear-gradient(to right, #9E4779, #C44C91);
						color: #fff;
						border: 0;
					}
				}
			}

			.echart {
				display: flex;
				margin-top: 40rpx;

			}
		}
	}
</style>
