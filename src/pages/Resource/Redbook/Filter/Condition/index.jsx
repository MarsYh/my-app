// 已选条件
import React from 'react'
import styles from './index.module.less'
import FilterRow from '../components/FilterRow'
import { useXhsResource } from '@/store/xhsResource'
function Condition(props) {
  // 从父组件里得到筛选信息
  const { selectedList } = props
  const { tableParams, dispatch } = useXhsResource()

  function handleResetClick(value) {
    const o = { ...tableParams }
    console.log(o)
    o.sourceFrom = value
    dispatch(o)
  }
  return (
    <FilterRow title="已选条件">
      {/* 当前的筛选内容 */}
      <div>
        {/* 对选中条件进行遍历 得到对应的值 */}
        {selectedList.map((item) => (
          <div key={item.label}>
            <span>{item.title}：</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div onClick={handleResetClick}>
        <div value={0} className={styles.clearBtn}>
          <span>重置所有筛选</span>
        </div>
      </div>
    </FilterRow>
  )
}
export default Condition
