import React from 'react'
import styles from './index.module.less'
import IconXHS from './img/icon-official-xiaohongshu.svg'

const InfoLeft = () => {
  return (
    <div className={styles.infoLeft}>
      <div className={styles.title}>
        <img src={IconXHS} alt="" />
        <span>小红书详情</span>
      </div>
      <div className={styles.list}>
        <div>传播表现</div>
        <div>性价比表现</div>
        <div>粉丝分析</div>
        <div>电商带货</div>
        <div>直播分析</div>
        <div>传播表现</div>
      </div>
      <div className={styles.divider}>私有数据</div>
      <div>历史投放</div>
    </div>
  )
}

export default InfoLeft
