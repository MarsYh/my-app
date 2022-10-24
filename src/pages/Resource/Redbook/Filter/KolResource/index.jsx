// 达人来源
import { Radio } from "antd";
import React from "react";
import styles from "./index.module.less";
import FilterRow from "../../../components/FilterRow";
import FilterSelected from "../../../components/FilterSelected";
import { useXhsResource } from "@/store/xhsResource";
import { RESOURCE_OPTIONS } from "../../sourceData";

function KolResource(props) {
  // 从父组件里得到筛选列表函数信息
  const { selectedRecord, setSelectedRecord } = props;
  const { tableParams, dispatch } = useXhsResource();

  function del() {
    // 1. 清除条件
    const _record = { ...selectedRecord };
    delete _record.sourceFrom;
    setSelectedRecord(_record);
    // 2. 同步筛选条件
    const o = { ...tableParams };
    o.sourceFrom = RESOURCE_OPTIONS[0].value;
    dispatch(o);
  }

  function onSourceChange(e) {
    const o = { ...tableParams };
    const record = { ...selectedRecord };
    o.sourceFrom = e.target.value;
    dispatch(o);

    const _label = RESOURCE_OPTIONS.find(
      (item) => item.value === o.sourceFrom
    ).label;

    if (_label === "全部") {
      delete record.sourceFrom;
    } else {
      record.sourceFrom = (
        <FilterSelected onDel={del}>
          <div>达人来源:{_label}</div>
        </FilterSelected>
      );
    }
    setSelectedRecord(record);
  }
  return (
    <FilterRow title="达人来源">
      <div className={styles.content}>
        <Radio.Group
          value={tableParams.sourceFrom}
          onChange={onSourceChange}
          options={RESOURCE_OPTIONS}
        />
      </div>
    </FilterRow>
  );
}
export default KolResource;
