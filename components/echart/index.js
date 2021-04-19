// 折线图模版
export const lineChartData = data => {
	let total = data.total
	let below = data.below
	const seriesData = data => {
		return {
			// 禁止点击 防止小程序无法滚动
			data: data.data,
			name: data.name,
			clickable: false,
			label: {
				show: true,
				position: 'top',
				fontSize: 13,
				formatter: `{c}`,
				textStyle: {
					color: data.color,
				}
			},
			type: 'line',
			color: data.color,
			symbol: 'circle',
			areaStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: data.colorStops
				}
			},
		}
	}
	total.color = '#E669BC'
	total.colorStops = [{
		offset: 0,
		color: 'rgba(230,105,188,.3)'
	}, {
		offset: 1,
		color: 'rgba(255,255,255,.1)'
	}]

	below.color = '#498BE5'
	below.colorStops = [{
		offset: 0,
		color: 'rgba(73,139,229,.3)'
	}, {
		offset: 1,
		color: 'rgba(255,255,255,.1)'
	}]

	let totalCal = seriesData(total)
	let belowCal = seriesData(below)
	let legend = [{
		name: total.name,
		icon: 'roundRect'
	}, {
		name: below.name,
		icon: 'roundRect'
	}];
	return {
		xAxis: {
			type: 'category',
			data: data.date,
			axisLine: {
				lineStyle: {
					color: "rgba(0,0,0,.2)"
				}
			},
			axisLabel: {
				// interval: 0,
				fontSize: 10,
				textStyle: {
					color: "#6C6E70",
				}
			},
			axisTick: {
				show: false
			}
		},
		yAxis: [{
			type: 'value',
			minInterval: 1,
			min: 0,
			splitLine: {
				show: true,
				lineStyle: {
					color: "rgba(232,232,232,.8)"
				},
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: "rgba(51,51,51,.3)"
				}
			}
		}],
		legend: {
			itemWidth: 16,
			itemHeight: 6,
			itemGap: 30,
			borderRadius: 5,
			data: legend,
			selectedMode: false,
			bottom: 0,
			orient: "horizontal",
			textStyle: {
				color: '#9BA3AA',
				fontSize: 12
			}
		},
		series: [totalCal, belowCal],
		tooltip: {
			trigger: 'axis',
			show: false,
		},
		grid: {
			top: 20,
			bottom: 60,
			left: 45,
			right: 20
		}
	}
}

// 饼图数据模版
export const pieChartData = data => {
	let res = []
	let legend = []
	let dataArr = []
	let colorArr = [
		[{
			offset: 0,
			color: 'rgba(36,119,221,1)'
		}, {
			offset: 1,
			color: 'rgba(36,119,221,.5)'
		}],
		[{
			offset: 0,
			color: 'rgba(26,203,153,1)'
		}, {
			offset: 1,
			color: 'rgba(26,203,153,.5)'
		}],
		[{
			offset: 0,
			color: 'rgba(252,213,148,1)'
		}, {
			offset: 1,
			color: 'rgba(252,213,148,.5)'
		}],
		[{
			offset: 0,
			color: 'rgba(255,104,104,1)'
		}, {
			offset: 1,
			color: 'rgba(255,104,104,.5)'
		}],
		[{
			offset: 0,
			color: 'rgba(214,214,214,1)'
		}, {
			offset: 1,
			color: 'rgba(214,214,214,.5)'
		}]
	]

	const resData = (legend, data) => {
		return {
			// 禁止点击 防止小程序无法滚动
			lazyLoad: true,
			disableTouch: true,
			// 饼图的数据结构 对应显示底部的列表
			legend: [{
				data: legend,
				align: 'left',
				itemWidth: 24, // 设置宽度
				itemHeight: 8, // 设置高度
				itemGap: 10,
				bottom: 0,
				width: 270

			}],
			series: [{
				// 饼图的数据
				data: data,
				minAngle: 4,
				emphasis: {
					label: {
						show: false
					}
				},
				// 调整饼图位置
				center: ['50%', '35%'],
				// 饼图的数据显示
				label: {
					// 对齐方式
					position: "center",
					show: true,
					// 指示线对应的数据显示方式
					normal: {
						formatter: "{c}人\n({d}%)",
						lineHeight: 16,
						color: '#9BA3AA'
					}
				},
				labelLine: {
					normal: {
						length: 1,
						// length2: 1,
						lineStyle: {
							color: "rgba(112,112,112,.2)", // 改变标示线的颜色
						}
					},
				},
				// 是否显示数据指示线 
				itemStyle: {
					borderWidth: 2,
					borderRadius: 6,
					borderColor: '#fff',
				},
				// 饼图的半圆显示方式
				radius: ["35%", "60%"],
				// radius: ["25%", "45%"],
				// 图标类型
				type: "pie",
			}],
			// 点击单独分类显示的提示框内容
			tooltip: {
				show: false,
				formatter: "{b}: {c} ({d}%)",
				trigger: "item"
			},
		}
	}

	for (let item of data) {
		let legend = []
		let data = []
		for (let i = 0; i < item.data.length; i++) {
			legend.push({
				name: item.data[i].name,
				icon: 'roundRect',
				textStyle: {
					color: "#6C6E70"
				},
			})
			data.push({
				"name": item.data[i].name,
				"value": item.data[i].value,
				"itemStyle": {
					color: {
						type: 'linear',
						colorStops: colorArr[i],
						global: false
					},
				}
			})
		}
		res.push({
			title: item.title,
			data: resData(legend, data)
		})
	}
	return res
}

// 柱状图
export const histogramChartData = () => {
	return {
		"grid": {
			"bottom": "3%",
			"containLabel": true,
			"left": "3%",
			"right": "4%"
		},
		"legend": {
			"data": ["有", "无", "我不了解"]
		},
		"series": [{
			"data": [320, 302, 301, 334, 390, 330, 320],
			"label": {
				"position": "insideRight",
				"show": true
			},
			"name": "有",
			"stack": "总量",
			"type": "bar"
		}, {
			"data": [120, 132, 101, 134, 90, 230, 210],
			"label": {
				"position": "insideRight",
				"show": true
			},
			"name": "无",
			"stack": "总量",
			"type": "bar"
		}, {
			"data": [220, 182, 191, 234, 290, 330, 310],
			"label": {
				"position": "insideRight",
				"show": true
			},
			"name": "我不了解",
			"stack": "总量",
			"type": "bar"
		}],
		"tooltip": {
			"axisPointer": {
				"type": "shadow"
			},
			"trigger": "axis"
		},
		"xAxis": {
			"type": "value"
		},
		"yAxis": {
			"data": ["高血压", "糖尿病", "心脑血管疾病", "合并心律失常"],
			"type": "category"
		}
	}
}
