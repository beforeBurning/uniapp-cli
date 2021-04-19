<template>
	<view>
		<view class="histogramChart">
			<view class="title">
				<view class="text">
					<text>{{title}}</text>
				</view>
				<em></em>
			</view>
			<view class="chartBox">
				<chart chart-class="chart" width="100%" height="470rpx" :option="echartData" />
			</view>
		</view>

	</view>
</template>

<script>
	import {
		histogramChartData
	} from "@/components/echart/index.js";

	export default {
		props: ['url', 'current', 'date'],
		data() {
			return {
				title: 'Hb<110g/L的疾病分布情况',
				echartData: '',
			}
		},
		mounted() {
			this.userInfo = this.$store.state.userInfo;
			this.small = this.$store.state.small;
			this.init()
		},
		watch: {
			current() {
				this.init()
			},
			date() {
				this.init()
			}
		},
		methods: {
			init() {
				this.echartData = histogramChartData();
			}
		}
	}
</script>

<style lang="less">
	.histogramChart {
		display: flex;
		margin-top: 40rpx;
		flex-direction: column;

		.title {
			display: flex;
			justify-content: space-between;
			margin: 0rpx 30rpx 30rpx 0;

			.text {
				display: flex;

				text {
					color: #000000;
					font-size: 34rpx;
					padding-left: 32rpx;
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
			}

			em {
				font-size: 24rpx;
				color: #9BA3AA;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
