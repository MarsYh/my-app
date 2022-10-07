// 多选筛选组件
import React, { useState } from "react";
import { Checkbox, Popover } from "antd";
import classNames from "classnames";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

const FilterCheckbox = (props) => {
  const { title, checked, options,onChange } = props;
  const [visible, setVisible] = useState(false);

  function onCheckChange(e,cur) {
    const _checked = e.target.checked
    let list = [ ...checked ]
    if(_checked){
        list.push(cur)
    }else{
        list = list.filter(item => item !== cur)
    }
    onChange(list)
  }

  return (
    <Popover
      onVisibleChange={(v) => setVisible(v)}
      trigger="click"
      placement="bottom"
      overlayClassName={styles.popover}
      content={
        <div className={styles.content}>
          {options.map((item) => (
            <Checkbox
              key={item}
              checked={checked.includes(item)}
              onChange={(e) => onCheckChange(e,item)}
            >
              {item}
            </Checkbox>
          ))}
        </div>
      }
    >
      <div className={classNames(styles.title, checked.length && styles.titleActive)}>
        <span>{title}</span>
        <CaretDownOutlined
          className={classNames(visible ? styles.rotate : styles.rotateReverse)}
        />
      </div>
    </Popover>
  );
};

export default FilterCheckbox;
