import React from 'react'
import styles from './index.module.less'
import IconXHS from './img/icon-official-xiaohongshu.svg'
import FirstTag from './FirstTag'
import SecondTag from './SecondTag'
import ThirdTag from './ThirdTag'
import FourthTag from './FourthTag'
import FifthTag from './FifthTag'
import SixthTag from './SixthTag'
import { Divider } from 'antd'
import History from './HistoryTag'

const InfoLeft = () => {
  return (
    <div className={styles.infoLeft}>
      <div className={styles.title}>
        <img src={IconXHS} alt="" />
        <span>小红书详情</span>
      </div>
      <div className={styles.list}>
        <FirstTag />
        <SecondTag />
        <ThirdTag />
        <FourthTag />
        <FifthTag />
        <SixthTag />
      </div>
      <Divider>
        <span className={styles.dataInfo}>私有数据</span>
      </Divider>
      <History />
    </div>
  )
}

export default InfoLeft
