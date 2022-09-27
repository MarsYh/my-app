// 当前的筛选条件
import React from "react";
import FilterRow from "../../../components/FilterRow";
import styles from "./index.module.less";

const Conditions = (props) => {

    const { selectedList } = props

  return (
    <FilterRow title="已选条件">
      {/* 当前的筛选内容 */}
      <div>
        {selectedList.map(item=>(
            <div key={item.label}>
                <span>{item.title}：</span>
                <span>{item.label}</span>
            </div>
        ))}
      </div>
      <div className={styles.clearBtn}>重置所有筛选</div>
    </FilterRow>
  );
};

export default Conditions;
