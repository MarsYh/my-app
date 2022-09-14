import React, { useContext } from "react";
import styles from "./index.module.less";
import IconXHS from "./img/icon-official-xiaohongshu.svg";
import { BTNS_CONFIG } from "../sourceData";
import classNames from "classnames";
import context from "../context"

const InfoLeft = () => {

  const res = useContext(context)
  const { dispatch,checked } = res

  return (
    <div className={styles.infoLeft}>
      <div className={styles.title}>
        <img src={IconXHS} alt="" />
        <span>小红书详情</span>
      </div>
      <div className={styles.btnGroup}>
        {BTNS_CONFIG.map((item) => (
          <div
            key={item.value}
            onClick={()=>dispatch(item)}
            className={classNames(
              styles.btn,
              checked === item.value && styles.checked
            )}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div> 
      {/* <div className={styles.divider}>私有数据</div>
      <div>历史投放</div> */}
    </div>
  );
};

export default InfoLeft;
