import React, { useState } from "react";
import { Tag, DatePicker } from "antd";
import dayjs from "dayjs";
import styles from "./index.module.less";
import FilterRow from "../../../components/FilterRow";
import { PUBLIC_TIME_CONFIG } from "../sourceData";
import { useXhsContentSearch } from "@/store/xhsContentSearch";

const { CheckableTag } = Tag;
const { RangePicker } = DatePicker;

function PublicTime() {
  const { tableParams, dispatch } = useXhsContentSearch();
  const [checked, setChecked] = useState(PUBLIC_TIME_CONFIG[0].value);

  const onRangeChange = (dates, dateStrings) => {
    const o = {...tableParams}
    const [min,max] = dateStrings
    if(min && max){
      o.publishTimeMin = min
      o.publishTimeMax = max
    }else{
      delete o.publishTimeMin
      delete o.publishTimeMax
    }
    dispatch(o)
  };

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  function handleTimeCheked(checkedValue) {
    if (checked === checkedValue) return;
    setChecked(checkedValue);

    if(checkedValue === 'user_defined') {
      console.log("用户自定义")
      return
    }

    const d = dayjs()
    const maxTime = d.format("YYYY-MM-DD");
    const minTime = d.add(checkedValue,'day').format("YYYY-MM-DD");

    const o = { ...tableParams };
    o.publishTimeMax = maxTime;
    o.publishTimeMin = minTime
    dispatch(o);

    // let minTime = null;
    // if (checkedValue === "3d") {
    //   minTime = d.add(-3, "day");
    // } else if (checkedValue === "7d") {
    //   minTime = d.add(-7, "day");
    // } else if (checkedValue === "15d") {
    //   minTime = d.add(-15, "day");
    // } else if (checkedValue === "30d") {
    //   minTime = d.add(-30, "day");
    // } else if (checkedValue === "60d") {
    //   minTime = d.add(-60, "day");
    // } else if (checkedValue === "90d") {
    //   minTime = d.add(-90, "day");
    // } else {
    //   console.log("用户自定义");
    // }

    // // 选择了时间选项
    // if (minTime) {
    //   const o = { ...tableParams };
    //   o.publishTimeMax = maxTime;
    //   o.publishTimeMin = minTime.format("YYYY-MM-DD");
    //   dispatch(o);
    // } else {
    // }
  }

  return (
    <FilterRow title="发布时间">
      <div className={styles.content}>
        {PUBLIC_TIME_CONFIG.map((item) => (
          <CheckableTag
            key={item.value}
            checked={checked === item.value}
            onClick={() => handleTimeCheked(item.value)}
          >
            {item.label}
          </CheckableTag>
        ))}
       {checked === 'user_defined' && <RangePicker  onChange={onRangeChange} />}
      </div>
    </FilterRow>
  );
}

export default PublicTime;
