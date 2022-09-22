// 柱状图
import React, { useRef } from "react";
import * as echarts from "echarts";
import { useEffect } from "react";
import styles from "./index.module.less";

const RectChart = (props) => {
  const chartDomRef = useRef(null);

  const { dataSource } = props;

  useEffect(() => {
    if (!chartDomRef.current) return;

    const myChart = echarts.init(chartDomRef.current);
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: dataSource,
          type: "bar",
          showBackground: true,
          backgroundStyle: { 
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }, [chartDomRef.current, dataSource]);

  return <div className={styles.box} ref={chartDomRef}></div>;
};

export default RectChart;
