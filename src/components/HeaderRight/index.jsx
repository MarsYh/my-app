// 头像资料
import { Avatar } from "antd";
import React from "react";
import styles from "./index.module.less";

const HeaderRight = () => {
  return (
    <div className={styles.profile}>
      <Avatar src="https://joeschmoe.io/api/v1/random" size={32} />
      <span>Users</span>
    </div>
  );
};

export default HeaderRight;
