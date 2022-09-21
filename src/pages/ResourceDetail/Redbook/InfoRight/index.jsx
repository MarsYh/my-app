import React, { useContext } from 'react'
import styles from './index.module.less'
import Price from './components/Price'
import context from '../context'
import SprPerfor from './components/SprPerfor'
import PriPerfor from './components/PriPerfor'
import BasicHead from './components/BasicHead'

const InfoRight = () => {
  // ?
  const { checked } = useContext(context)
  // console.log(checked)
  return (
    <div className={styles.infoRight}>
      <BasicHead />
      <div className={styles.content}>
        <Price />
        <div className={styles.contentRight}>
          {checked === 'spread_performance' && <SprPerfor />}
          {checked === 'price_performance' && <PriPerfor />}
        </div>
      </div>
    </div>
  )
}

export default InfoRight
