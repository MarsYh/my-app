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
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: dataSource,
          type: 'bar',
          barWidth: '20%',
          showBackground: true,
          backgroundStyle: {
            color: 'none',
          },
        },
      ],
    }

    option && myChart.setOption(option)
  }, [chartDomRef.current, dataSource])

  return <div className={styles.box} ref={chartDomRef}></div>
}

export default RectChart
