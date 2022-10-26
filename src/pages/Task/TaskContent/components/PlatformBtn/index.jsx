import React from 'react'
import styles from './index.module.less'
import classNames from 'classnames'

function PlatformBtn(props) {
  const { icon, num, title, onClick, checked } = props
  return (
    <div
      className={classNames(styles.item, checked && styles.active)}
      onClick={onClick}>
      <img src={icon} alt="" />
      <div>
        <span>{title}</span>
        <span className={styles.dote}></span>
        <span>{num}</span>
      </div>
    </div>
  )
}

export default PlatformBtn
