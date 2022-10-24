// 博主信息
import React, { useState, useRef } from 'react'
import styles from './index.module.less'
import FilterSelected from '../../../components/FilterSelected'
import FilterRow from '../../../components/FilterRow'
import FilterRadio from '../../../components/FilterRadio'
import FilterCheckbox from '../../../components/FilterCheckbox'
import { useXhsResource } from '@/store/xhsResource'
import { useDebounceFn, useUpdateEffect } from 'ahooks'
import { isEqual } from 'lodash-es'
import { KOL_PROPERTY } from './sourceData'
import region from '@/assets/region.json'

function BloggerInfo(props) {
  // 解决无法获取当前元素的问题
  const recordRef = useRef(null)
  const tableParamsRef = useRef(null)
  const { dataSource, selectedRecord, setSelectedRecord } = props
  const { tableParams, dispatch } = useXhsResource()
  const [slotFansValue, setSlotFansValue] = useState({})
  const [locationValues, setLocationValues] = useState([])
  const [kolValues, setKolValues] = useState([])
  const [regionValues, setRegionValues] = useState([])
  recordRef.current = selectedRecord
  tableParamsRef.current = tableParams

  function delRadioParams(key) {
    const o = { ...tableParamsRef.current }
    const _record = { ...recordRef.current }
    delete _record[key]
    delete o[key]

    if (slotFansValue.min || slotFansValue.max) {
      setSlotFansValue({})
    }

    dispatch(o)
    setSelectedRecord(_record)
  }

  function onRadioChange(key, params, title) {
    const o = { ...tableParams }
    const _record = { ...selectedRecord }
    // 设置一个变量可以用[] 这样多个地方都可以用到 设置不同的key就可以
    o[key] = params
    let dom = null
    if (typeof params === 'object') {
      if ('desc' in params) {
        dom = (
          <FilterSelected onDel={() => delRadioParams(key)}>
            <div>
              {title}：
              {params.desc ? params.desc : `${params.min}-${params.max}`}
            </div>
          </FilterSelected>
        )
      }
      if ('label' in params) {
        o[key] = params.value
        dom = (
          <FilterSelected onDel={() => delRadioParams(key)}>
            <div>
              {title}：{params.label}
            </div>
          </FilterSelected>
        )
      }
    } else {
      dom = (
        <FilterSelected onDel={() => delRadioParams(key)}>
          <div>
            {title}：{params}
          </div>
        </FilterSelected>
      )
    }
    _record[key] = dom

    dispatch(o)
    setSelectedRecord(_record)
  }

  function onInputFansChange(key, value) {
    const _slotValue = { ...slotFansValue }
    _slotValue[key] = value
    setSlotFansValue(_slotValue)
  }

  function onValuesDel(key, value) {
    const o = { ...tableParamsRef.current }
    o[key] = o[key].filter((str) => str !== value)
    if (!o[key].length) {
      delete o[key]
    }
    dispatch(o)
  }

  function renderValues(title, key, values) {
    const record = { ...selectedRecord }
    if (values?.length) {
      record[key] = values.map((item) => {
        let label, value
        if (typeof item === 'object') {
          label = item.label
          value = item.value
        } else {
          label = item
          value = item
        }
        return (
          <FilterSelected key={value} onDel={() => onValuesDel(key, value)}>
            <div>
              {title}：{label}
            </div>
          </FilterSelected>
        )
      })
    } else {
      delete record[key]
    }
    setSelectedRecord(record)
  }

  // 让tableParams.location在初始状态下不运行
  useUpdateEffect(() => {
    // 渲染location的条件
    renderValues('所在地域', 'location', tableParams.location)
    if (isEqual(locationValues, tableParams.location)) {
      return
    }
    setLocationValues(tableParams.location || [])
  }, [tableParams.location])

  // 达人属性
  useUpdateEffect(() => {
    // 渲染kolvalues的条件
    const items = tableParams.userAttributeList
      ? KOL_PROPERTY.filter((item) =>
          tableParams.userAttributeList.includes(item.value)
        )
      : []
    setKolValues(items)
    renderValues('达人属性', 'userAttributeList', items)
  }, [tableParams.userAttributeList])

  // IP归属地
  useUpdateEffect(() => {
    // 渲染regionvalues的条件
    const items = tableParams.ipLocation
      ? region.filter((item) => tableParams.ipLocation.includes(item.value))
      : []
    setRegionValues(items)
    renderValues('IP归属地', 'ipLocation', items)
  }, [tableParams.ipLocation])

  // function delLocation(item) {
  //   const o = { ...tableParamsRef.current }
  //   const record = { ...selectedRecord }
  //   o.location = o.location.filter((str) => str !== item)
  //   if (!o.location.length) {
  //     delete o.location
  //     delete record.location
  //   } else {
  //     record.location = o.location.map((str) => (
  //       <FilterSelected key={str} onDel={() => delLocation(str)}>
  //         <div>所在地域:{str}</div>
  //       </FilterSelected>
  //     ))
  //   }
  //   dispatch(o)
  //   setSelectedRecord(record)
  // }

  const { run } = useDebounceFn(
    (key, values) => {
      const o = { ...tableParams }
      if (values.length) {
        o[key] = values
      } else {
        delete o[key]
      }
      dispatch(o)
    },
    {
      wait: 500,
    }
  )

  // 多选回调
  function onLocationChange(values) {
    // 设置勾选状态
    setLocationValues(values)
    // 用户勾选完毕再执行防抖
    run('location', values)
  }

  function onKolChange(values) {
    // 设置勾选状态
    setKolValues(values)
    // 用户勾选完毕再执行防抖
    const params = values.map((o) => o.value)
    run('userAttributeList', params)
  }
  function onRegionChange(values) {
    // 设置勾选状态
    setRegionValues(values)
    // 用户勾选完毕再执行防抖
    const params = values.map((o) => o.value)
    run('ipLocation', params)
  }

  const fansSlotBtnDisabled =
    slotFansValue.min === undefined || slotFansValue.max === undefined

  return (
    <FilterRow title="博主信息">
      <div className={styles.content}>
        <FilterRadio
          title="粉丝数量"
          isSlot
          checked={tableParams.fansNum}
          options={dataSource.fansNum || []}
          onChange={(value) => onRadioChange('fansNum', value, '粉丝数量')}
          minProps={{
            placeholder: '0',
            value: slotFansValue.min,
            min: '0',
            max: '5000000',
            onChange: (value) => onInputFansChange('min', value),
          }}
          maxProps={{
            placeholder: '5000000',
            value: slotFansValue.max,
            min: '0',
            max: '5000000',
            onChange: (value) => onInputFansChange('max', value),
          }}
          slotOkBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          slotResetBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          onReset={() => delRadioParams('fansNum')}
          onOk={() => onRadioChange(slotFansValue)}
        />
        <FilterRadio
          title="博主性别"
          checked={tableParams.gender}
          options={dataSource.gender || []}
          onChange={(value) => onRadioChange('gender', value, '博主性别')}
        />
        <FilterCheckbox
          title="所在地域"
          options={dataSource.location || []}
          checked={locationValues}
          onChange={onLocationChange}
        />
        <FilterRadio
          title="博主等级"
          checked={tableParams.currentLevel}
          options={dataSource.currentLevel || []}
          onChange={(value) => onRadioChange('currentLevel', value, '博主等级')}
        />
        <FilterRadio
          title="笔记类型"
          checked={tableParams.noteType}
          options={dataSource.noteType || []}
          onChange={(value) => onRadioChange('noteType', value, '笔记类型')}
        />
        <FilterCheckbox
          title="IP归属地"
          options={region}
          checked={regionValues}
          onChange={onRegionChange}
        />
        <FilterCheckbox
          title="达人属性"
          options={KOL_PROPERTY}
          checked={kolValues}
          onChange={onKolChange}
        />
      </div>
    </FilterRow>
  )
}
export default BloggerInfo
