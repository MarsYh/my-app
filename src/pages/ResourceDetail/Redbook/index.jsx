import React from 'react'
import styles from './index.module.less'
import InfoLeft from './InfoLeft'
import InfoRight from './InfoRight'

const Info = () => {
  return (
    <div className={styles.infoBox}>
      <InfoLeft />
      <InfoRight />
    </div>
  )
}

export default Info
