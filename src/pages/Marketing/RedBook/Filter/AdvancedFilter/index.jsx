import React, { useRef } from 'react'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { ADVANCED_FILTER_CONFIG } from '../sourceData'
import AdvancedFilterModal from './components/AdvancedFilterModal'

function AdvancedFilter() {
  const advancedFilterRef = useRef()
  return (
    <FilterRow title="高级筛选">
      {ADVANCED_FILTER_CONFIG.map((item) => (
        <div
          key={item.value}
          className={styles.btnGroup}
          onClick={() => advancedFilterRef.current?.open(item.value)}>
          <img src={item.icon} alt="" />
          <span>{item.label}</span>
        </div>
      ))}
      <AdvancedFilterModal ref={advancedFilterRef} />
    </FilterRow>
  )
}

export default AdvancedFilter
