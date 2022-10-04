// 单选筛选组件
import React from "react";
import { Popover, Button, InputNumber } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { useState } from "react";
import classNames from "classnames";

// {desc,min,max}

const FilterRadio = (props) => {
  const {
    title,
    options,
    isSlot = false,
    onChange,
    checked,
    minProps,
    maxProps,
    onReset,
    onOk,
    slotResetBtnProps,
    slotOkBtnProps,
  } = props;

  const [visible, setVisible] = useState(false);

  function handleTitleClick() {
    setVisible(!visible);
  }

  function handleOptionClick(option) {
    onChange(option);
    setVisible(false);
  }

  function handleOk() {
    onOk();
    setVisible(false);
  }

  function handleReset(){
    onReset();
    setVisible(false);
  }

  return (
    <Popover
      visible={visible}
      content={
        <div className={styles.content}>
          <div className={styles.optionGroup}>
            {options.map((item) => (
              <div
                key={item.desc}
                className={classNames(
                  checked?.desc === item.desc && styles.optionChecked,
                  styles.option
                )}
                onClick={() => handleOptionClick(item)}
              >
                {item.desc}
              </div>
            ))}
          </div>
          {isSlot && (
            <div className={styles.slot}>
              <div>
                <InputNumber {...minProps} />
                -
                <InputNumber {...maxProps} />
              </div>
              <div>
                <Button type="link" onClick={handleReset} {...slotResetBtnProps}>
                  重置
                </Button>
                <Button type="primary" onClick={handleOk} {...slotOkBtnProps}>
                  确认
                </Button>
              </div>
            </div>
          )}
        </div>
      }
      placement="bottom"
    >
      <div
        className={classNames(styles.title, checked && styles.titleActive)}
        onClick={handleTitleClick}
      >
        <span>{title}</span>
        <CaretDownOutlined
          className={classNames(visible ? styles.rotate : styles.rotateReverse)}
        />
      </div>
    </Popover>
  );
};

export default FilterRadio;
