import React from 'react'
import styles from './index.module.less'
import InfoLeft from './InfoLeft'
import InfoRight from './InfoRight'
import { useParams, useLocation } from 'react-router-dom'

const Info = () => {
  // console.log("useParams:",useParams())
  // console.log("useLocation:",useLocation())

  return (
    <div className={styles.infoBox}>
      <InfoLeft />
      <InfoRight />
    </div>
  )
}

export default Info
