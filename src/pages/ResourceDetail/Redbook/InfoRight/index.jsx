import React from 'react'
import { Button } from 'antd'
import styles from './index.module.less'
import IconHead from './img/head-photo.jpg'
import IconGift from '@/assets/img/icon-gift.svg'
import IconShopCart from '@/assets/img/icon-shopcart.svg'

const InfoRight = () => {
  return (
    <div className={styles.infoRight}>
      <div className={styles.title}>
        <div className={styles.titleLeft}>
          <img src={IconHead} alt="" />
          <div className={styles.button}>
            <div className={styles.checkBtn}>
              <Button>查看主页</Button>
              <Button>更新数据</Button>
            </div>
            <Button>+ 添加</Button>
          </div>
        </div>
        <div className={styles.titleRight}>
          <div className={styles.dataBox}>
            <div className={styles.dataContainer}>
              <div className={styles.infoList}>
                <span className={styles.name}>丁郑美子</span>
                <span>LV4</span>
                <div>
                  <img src={IconGift} alt="" />
                </div>
                <div>
                  <img src={IconShopCart} alt="" />
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div className={styles.dataList}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoRight
