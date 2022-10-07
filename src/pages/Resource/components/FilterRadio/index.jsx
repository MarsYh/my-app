// 单选筛选组件
import React from "react";
import { Popover, Button, InputNumber, Divider, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { useState } from "react";
import classNames from "classnames";

// {desc,min,max}
// gender ["全部","男","女"]

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

  function handleOptionClick(option) {
    onChange(option);
    setVisible(false);
  }

  function handleOk() {
    onOk();
    setVisible(false);
  }

  function handleReset() {
    onReset();
    setVisible(false);
  }

  // 组件处理多种数据类型
  const renderDom = () => {
    return options.map((item) => {
      let label,
        value,
        isChecked = false;
      if (typeof item === "object") {
        label = item.desc;
        value = item.desc;
        isChecked = checked?.desc === label;
      } else {
        label = item;
        value = item;
        isChecked = checked === label;
      }

      const _class = classNames(
        isChecked && styles.optionChecked,
        styles.option
      );
      return (
        <div
          key={value}
          className={_class}
          onClick={() => handleOptionClick(item)}
        >
          {label}
        </div>
      );
    });
  };

  return (
    <Popover
      overlayClassName={styles.popover}
      onVisibleChange={(v) => setVisible(v)}
      trigger="click"
      content={
        <div className={styles.content}>
          <div className={styles.optionGroup}>{renderDom()}</div>
          <Divider />
          {isSlot && (
            <div className={styles.slot}>
              <Space style={{ gap: "8px" }}>
                <InputNumber {...minProps} />
                -
                <InputNumber {...maxProps} />
              </Space>
              <div className={styles.btnGroup}>
                <Button
                  type="link"
                  onClick={handleReset}
                  {...slotResetBtnProps}
                >
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
      <div className={classNames(styles.title, checked && styles.titleActive)}>
        <span>{title}</span>
        <CaretDownOutlined
          className={classNames(visible ? styles.rotate : styles.rotateReverse)}
        />
      </div>
    </Popover>
  );
};

export default FilterRadio;
