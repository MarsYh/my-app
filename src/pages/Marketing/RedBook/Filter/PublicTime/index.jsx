import React, { useState } from "react";
import { Tag, DatePicker } from "antd";
import dayjs from "dayjs";
import styles from "./index.module.less";
import FilterRow from "../../../components/FilterRow";
import { PUBLIC_TIME_CONFIG } from "../sourceData";
import { useXhsContentSearch } from "@/store/xhsContentSearch";
import { useXhsSelected } from "@/store/xhsContentSelected";

const { CheckableTag } = Tag;
const { RangePicker } = DatePicker;

function PublicTime() {
  const { tableParams, dispatch } = useXhsContentSearch();
  const [checked, setChecked] = useState();
  // 当前选择的条件
  const [selected, dispatchSelected] = useXhsSelected();

  function handleDel() {
    // 1.清除筛选条件
    const _selected = { ...selected };
    delete _selected.time;
    dispatchSelected(_selected);
    // 2.清除带给后端的筛选字段
    const _tableParams = { ...tableParams };
    delete _tableParams.publishTimeMax;
    delete _tableParams.publishTimeMin;
    dispatch(_tableParams);
    // 3.删除选中状态
    setChecked();
  }

  const onRangeChange = (dates, dateStrings) => {
    const o = { ...tableParams };
    const [min, max] = dateStrings;
    if (min && max) {
      o.publishTimeMin = min;
      o.publishTimeMax = max;
    } else {
      delete o.publishTimeMin;
      delete o.publishTimeMax;
    }
    dispatch(o);

    const _selected = { ...selected };
    if (min && max) {
      // 条件
      const dom = (
        <div>
          <span>
            {min}-{max}
          </span>
          <span onClick={handleDel}>x</span>
        </div>
      );
      _selected.time = [dom];
    } else {
      delete _selected.time;
    }
    dispatchSelected(_selected);
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

  function handleTimeCheked(item) {
    const checkedValue = item.value;
    if (checked === checkedValue) return;
    setChecked(checkedValue);

    if (checkedValue === "user_defined") {
      console.log("用户自定义");
      return;
    }

    const d = dayjs();
    const maxTime = d.format("YYYY-MM-DD");
    const minTime = d.add(checkedValue, "day").format("YYYY-MM-DD");

    const o = { ...tableParams };
    o.publishTimeMax = maxTime;
    o.publishTimeMin = minTime;
    dispatch(o);

    // 显示的条件
    const dom = (
      <div>
        <span>{item.label}</span>
        <span onClick={handleDel}>x</span>
      </div>
    );
    const _selected = { ...selected };
    _selected.time = [dom];
    dispatchSelected(_selected);
  }

  return (
    <FilterRow title="发布时间">
      <div className={styles.content}>
        {PUBLIC_TIME_CONFIG.map((item) => (
          <CheckableTag
            key={item.value}
            checked={checked === item.value}
            onClick={() => handleTimeCheked(item)}
          >
            {item.label}
          </CheckableTag>
        ))}
        {checked === "user_defined" && <RangePicker onChange={onRangeChange} />}
      </div>
    </FilterRow>
  );
}

export default PublicTime;
