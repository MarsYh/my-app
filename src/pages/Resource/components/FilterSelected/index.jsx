// 筛选条件item
import React from "react";
import styles from "./index.module.less";
import { CloseOutlined } from "@ant-design/icons";

const FilterSelected = (props) => {
  const { children, onDel } = props;

  return (
    <div className={styles.box}>
      {children}
      <CloseOutlined onClick={onDel} />
    </div>
  );
};

export default FilterSelected;
