import IconAll from "../img/all.svg"
import IconTiktok from "../img/tiktok.svg"
import IconRedBook from "../img/xhs.svg"
import IconWeibo from "../img/weibo.svg"
import IconWechat from "../img/wechat.svg"
import IconBilibili from "../img/bilibili.svg"
import styles from "./index.module.less"

export const TASK_PLATFORM_LIST = [
  {
    label: (
      <div className={styles.tabItem}>
        <img src={IconAll} alt="" />
        <span>
          全部
          <span className={styles.dote}></span>
        </span>
      </div>
    ),
  },
  {
    label: (
      <div className={styles.tabItem}>
        <img src={IconTiktok} alt="" />
        <span>
          抖音
          <span className={styles.dote}></span>
        </span>
      </div>
    ),
    value: "1",
  },
  {
    label: (
      <div className={styles.tabItem}>
        <img src={IconRedBook} alt="" />
        <span>
          小红书
          <span className={styles.dote}></span>
        </span>
      </div>
    ),
    value: "2",
  },
  {
    label: (
      <div className={styles.tabItem}>
        <img src={IconWeibo} alt="" />
        <span>
          微博
          <span className={styles.dote}></span>
        </span>
      </div>
    ),
    value: "3",
  },
  {
    label: (
      <div className={styles.tabItem}>
        <img src={IconWechat} alt="" />
        <span>
          微信
          <span className={styles.dote}></span>
        </span>
      </div>
    ),
    value: "4",
  },
  {
    label: (
      <div className={styles.tabItem}>
        <img src={IconBilibili} alt="" />
        <span>
          B站
          <span className={styles.dote}></span>
        </span>
      </div>
    ),
    value: "5",
  },
]

export const DATA_TYPE_CONFIG = [
  {
    label: "达人数据",
    value: "达人数据",
  },
  {
    label: "投放数据",
    value: "投放数据",
  },
]
