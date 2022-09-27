// 柱状图

import * as echarts from "echarts";

import React, { useRef } from "react";

import { renderToString } from "react-dom/server";
import styles from "./index.module.less";
import { useEffect } from "react";

const RectChart = (props) => {
  const chartDomRef = useRef(null);

  const { dataSource, xData, tooltip, color } = props;
  useEffect(() => {
    if (!chartDomRef.current) return;

    // tooltip配置
    const internalToolTip = tooltip;
    if (internalToolTip) {
      if (!internalToolTip.trigger) {
        internalToolTip.trigger = "axis";
      }

      if (internalToolTip.formatter) {
        const externalFormatter = internalToolTip.formatter;
        internalToolTip.formatter = (params) => {
          const dom = externalFormatter(params);
          return renderToString(dom);
        };
      }
    }

    // color颜色配置
    const internalColor =
      color ||
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 1,
          color: "#2998FF",
        },
        {
          offset: 0,
          color: "#727FFF",
        },
      ]);

    const myChart = echarts.init(chartDomRef.current);
    const option = {
      tooltip: internalToolTip || {},
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        axisLabel: {
          formatter: function (value) {
            if (value === 0) return value;
            return parseInt(value / 10000) + "w";
          },
        },
        type: "value",
      },
      series: [
        {
          data: dataSource,
          type: "bar",
          barWidth: "20%",
          showBackground: true,
          itemStyle: {
            emphasis: {
              barBorderRadius: [8, 8, 0, 0],
            },
            normal: {
              label: {
                show: true, //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  color: "#889191",
                  fontWeight: "500",
                  fontSize: 10,
                },
                formatter: function (params) {
                  // console.log('params:', params)
                  //核心部分 formatter 可以为字符串也可以是回调
                  if (params.value.length <= 5) return params.value;
                  return `${(params.value / 10000).toFixed(2)}w`;
                },
              },

              barBorderRadius: [8, 8, 0, 0],
              color: internalColor,
            },
          },
          backgroundStyle: {
            color: "none",
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }, [dataSource, xData]);

  return <div className={styles.box} ref={chartDomRef}></div>;
};

export default RectChart;
