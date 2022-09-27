// 搜索维度
import { Radio } from "antd";
import React from "react";
import styles from "./index.module.less";
import FilterRow from "../../../components/FilterRow";

const SearchType = () => {
  return (
    <FilterRow title="搜索维度">
      <div className={styles.content}>
        <Radio>名称或Id</Radio>
        <Radio>MCN</Radio>
      </div>
    </FilterRow>
  );
};

export default SearchType;
