import React, { useContext } from 'react'
import { Input } from 'antd'
import styles from './index.module.less'
import IconOfficialPrice from './img/icon-official-price.svg'
import IconPrivatePrice from './img/icon-private-price.svg'
import { QuestionCircleOutlined } from '@ant-design/icons'
import context from '../context'
import SprPerfor from './components/SprPerfor'
import PriPerfor from './components/PriPerfor'
import BasicHead from './components/BasicHead'

const { TextArea } = Input
const InfoRight = () => {
  // ?
  const { checked } = useContext(context)
  // console.log(checked)
  return (
    <div className={styles.infoRight}>
      <BasicHead />
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.official_price}>
            <div>
              <img src={IconOfficialPrice} alt="" />
            </div>
            <div className={styles.picture_price}>
              <span className={styles.price}>图文笔记一口价</span>
              <span className={styles.number}>¥17000</span>
            </div>
            <div className={styles.video_price}>
              <span className={styles.price}>视频笔记一口价</span>
              <span className={styles.number}>¥27000</span>
            </div>
            <div className={styles.live_normal_price}>
              <span className={styles.price}>直播拼场报价</span>
              <span className={styles.number}>¥37000</span>
            </div>
            <div className={styles.live_special_price}>
              <span className={styles.price}>直播专场报价</span>
              <span className={styles.number}>¥37000</span>
            </div>
            <div className={styles.dataTime}>
              <div>数据更新时间：</div>
              <div>2022/09/16 12:00:00</div>
            </div>
          </div>
          <div className={styles.private_price}>
            <div className={styles.privateHead}>
              <img src={IconPrivatePrice} alt="" />
              <div className={styles.note}>
                <QuestionCircleOutlined />
                <span>说明</span>
              </div>
            </div>
            <div className={styles.picture_price_input}>
              <div>图文笔记一口价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.video_price_input}>
              <div>视频笔记一口价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.live_normal_price_input}>
              <div>直播拼场报价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.live_special_price_input}>
              <div>直播专场报价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.note_input}>
              <div>报价备注</div>
              <TextArea
                rows={4}
                placeholder="请填写其他类型的报价
备注"
                maxLength={6}
              />
            </div>
          </div>
        </div>
        <div className={styles.contentRight}>
          {checked === 'spread_performance' && <SprPerfor />}
          {checked === 'price_performance' && <PriPerfor />}
        </div>
      </div>
    </div>
  )
}

export default InfoRight
