<template>
	<view>
		<view class="list">
			<span>
				<p>{{history}}</p>
				<em>历史检测</em>
				<em>总数</em>
			</span>
			<span>
				<p>{{below}}</p>
				<em>Hb{{'<'}}{{small}}g/L</em>
				<em>检测数</em>
			</span>
			<span>
				<p>{{proportion}}</p>
				<em>Hb{{'<'}}{{small}}g/L</em>
				<em>检测比例</em>
			</span>
		</view>
		<view class="pieChart" v-for="(item,index) in list" :key="index">
			<view class="title">
				<view class="text">
					<text v-if="item.title">{{item.title}}</text>
				</view>
				<em>Hb单位：g/L</em>
			</view>
			<view class="chartBox">
				<chart chart-class="chart" width="100%" height="470rpx" :option="item.data" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pieChartData
	} from "@/components/echart/index.js";
	import {
		cake,
		reportform,
	} from '@/api/index.js'

	export default {
		props: ['url', 'current', 'date'],
		data() {
			return {
				echartData: '',
				small: '',
				history: '',
				below: '',
				proportion: '',
				list: [],
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
				if (this.url === 'cake') {
					cake({
						is_history: this.current,
						search_date: this.date,
						is_type: 1
					}).then(res => {
						if (res) {
							console.log(res);
							this.history = res.data.history
							this.below = res.data.below
							this.proportion = res.data.proportion
							this.list = pieChartData(res.data.list)
						}
					})
				} else {
					reportform({
						is_history: this.current,
						search_date: this.date,
						is_type: 1
					}).then(res => {
						if (res) {
							this.history = res.data.history
							this.below = res.data.below
							this.proportion = res.data.proportion
							this.list = pieChartData(res.data.list)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.list {
		display: flex;
		border-bottom: 1px dashed #EDF0F4;
		margin: 0 30rpx;

		span {
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			position: relative;
			flex-direction: column;
			height: 190rpx;

			p {
				font-size: 40rpx;
				color: #C44C91;
			}

			em {
				font-size: 24rpx;
				color: #9BA3AA;
			}

			&::after {
				content: '';
				position: absolute;
				width: 1px;
				height: 80rpx;
				right: 0;
				background-color: #EDF0F4;
			}

			&:last-child:after {
				display: none;
			}
		}

	}

	.pieChart {
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
