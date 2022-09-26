// 柱状图
import React, { useRef } from 'react'
import * as echarts from 'echarts'
import { useEffect } from 'react'
import styles from './index.module.less'

const RectChart = (props) => {
  const chartDomRef = useRef(null)

  const { dataSource, xData } = props
  useEffect(() => {
    if (!chartDomRef.current) return

    const myChart = echarts.init(chartDomRef.current)
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          // console.log('params:', params)
          params.forEach(function (item) {})
          return
        },
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        axisLabel: {
          formatter: function (value) {
            if (value === 0) return value
            return parseInt(value / 10000) + 'w'
          },
        },
        type: 'value',
      },
      series: [
        {
          data: dataSource,
          type: 'bar',
          barWidth: '20%',
          showBackground: true,
          itemStyle: {
            emphasis: {
              barBorderRadius: [8, 8, 0, 0],
            },
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: '#889191',
                  fontWeight: '500',
                  fontSize: 10,
                },
                formatter: function (params) {
                  // console.log('params:', params)
                  //核心部分 formatter 可以为字符串也可以是回调
                  if (params.value.length <= 5) return params.value
                  return `${(params.value / 10000).toFixed(2)}w`
                },
              },

              barBorderRadius: [8, 8, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: '#2998FF',
                },
                {
                  offset: 0,
                  color: '#727FFF',
                },
              ]),
            },
          },
          backgroundStyle: {
            color: 'none',
          },
        },
      ],
    }

    option && myChart.setOption(option)
  }, [dataSource, xData])

  return <div className={styles.box} ref={chartDomRef}></div>
}

export default RectChart
