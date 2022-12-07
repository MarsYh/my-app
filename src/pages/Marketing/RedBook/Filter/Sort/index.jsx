import React from "react";
import FilterRow from "../../../components/FilterRow";
import { Tag } from "antd";
import styles from "./index.module.less";
import { SORT_CONFIG } from "../sourceData";
import { useXhsContentSearch } from "@/store/xhsContentSearch";

function Sort(props) {
  // 从父组件里得到筛选列表函数信息
  // const { selectedRecord, setSelectedRecord } = props;
  const { tableParams, dispatch } = useXhsContentSearch();
  const { CheckableTag } = Tag;

  // function del() {
  //   // 1. 清除条件
  //   const _record = { ...selectedRecord };
  //   delete _record.sortFiled;
  //   setSelectedRecord(_record);
  //   // 2. 同步筛选条件
  //   const o = { ...tableParams };
  //   o.sortFiled = SORT_CONFIG[0].value;
  //   dispatch(o);
  // }

  function onSortChange(item) {
    const o = { ...tableParams };
    // 是否点击的是同一项
    if (o.sortFiled === item.value) {
      // second or third click
      // 判断是升序还是降序
      if (o.desc) {
        o.desc = false;
      } else {
        delete o.sortFiled;
        delete o.desc;
      }
    } else {
      // first click
      o.sortFiled = item.value;
      o.desc = true;
    }
    dispatch(o);
  }

  function renderIcon(value) {
    if (tableParams.sortFiled !== value) return null;
    // 判断箭头放下
    return tableParams.desc ? "下" : "上";
  }

  return (
    <FilterRow
      title={
        <>
          <span className={styles.item}>排</span>序
        </>
      }
    >
      <div className={styles.content}>
        {SORT_CONFIG.map((item) => (
          <CheckableTag
            key={item.value}
            checked={tableParams.sortFiled === item.value}
            onChange={() => onSortChange(item)}
          >
            {item.label}
            {renderIcon(item.value)}
          </CheckableTag>
        ))}
      </div>
    </FilterRow>
  );
}

export default Sort;
