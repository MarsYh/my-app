// 粉丝分析
import React from 'react'
import { Checkbox } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import FilterRow from '../components/FilterRow'
import IconNew from '@/assets/img/icon-new.svg'
function FanAnalysis() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }
  return (
    <FilterRow title="粉丝分析">
      <div className={styles.item}>
        <div className={styles.title}>
          <span>粉丝画像</span>
          <CaretDownOutlined />
        </div>
        <Checkbox onChange={onChange}>近30日粉丝数上升达人</Checkbox>
        <Checkbox onChange={onChange}>
          <img src={IconNew} alt="" />
          <span className={styles.new}>新晋黑马账号</span>
        </Checkbox>
      </div>
    </FilterRow>
  )
}
export default FanAnalysis
