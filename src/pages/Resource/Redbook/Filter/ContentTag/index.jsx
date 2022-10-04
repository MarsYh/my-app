// 内容标签
import React from 'react'
import { Checkbox, Popover, Tag, Typography } from 'antd'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { useXhsResource } from '@/store/xhsResource'
import { useState, useEffect, useRef } from 'react'
import { useDebounce, useSize, useDebounceFn } from 'ahooks'
import FilterSelected from '../../../components/FilterSelected'
import classNames from 'classnames'

function ContentTag(props) {
  const { dataSource, selectedRecord, setSelectedRecord } = props
  const { contentTags: options = [] } = dataSource

  const ref = useRef(null)
  const { CheckableTag } = Tag
  const { tableParams, dispatch } = useXhsResource()
  const [contentTags, setContentTags] = useState([])
  // 是否被折叠
  const [collapse, setCollapse] = useState(true)
  // 展开/收起 是否显示
  const [isShow, setIsShow] = useState(false)
  const size = useSize(ref) || { size: {} }
  const debouncedValue = useDebounce(size.width, { wait: 500 })

  // 设置防抖函数
  const { run } = useDebounceFn(
    (contentTags) => {
      const _tableParams = { ...tableParams }
      if (contentTags.length) {
        _tableParams.contentTags = contentTags
      } else {
        delete _tableParams.contentTags
      }
      dispatch(_tableParams)
      // 渲染筛选条件
      renderSelected(contentTags)
    },
    {
      wait: 500,
    }
  )

  function del(item, level2Child) {
    // 1. 删除条件
    let _contentTags = [...contentTags]
    if (level2Child) {
      const idx = _contentTags.findIndex((o) => o.level1 === item.level1)
      const current = _contentTags[idx]
      current.level2 = current.level2.filter((str) => str !== level2Child)
      // 判断是否有剩余
      if (!current.level2.length) {
        _contentTags.splice(idx, 1)
      }
    } else {
      _contentTags = _contentTags.filter((o) => o.level1 !== item.level1)
    }
    renderSelected(_contentTags)
    setContentTags(_contentTags)
    // 2.改变表格参数
    run(_contentTags)
  }

  // 渲染条件
  function renderSelected(contentTags) {
    const record = { ...selectedRecord }
    record.contentTags = contentTags.map((selectedData) => {
      const { level1, level2 } = selectedData
      const original = options.find((o) => o.level1 === level1)

      // 没有子项的情况
      if (!level2.length) {
        return (
          <FilterSelected key={level1} onDel={() => del(selectedData)}>
            <div>
              内容标签:
              <span className={styles.tagContent}>{level1}</span>
            </div>
          </FilterSelected>
        )
      }

      // 子项被全选的情况
      if (original.level2?.length === level2?.length) {
        return (
          <FilterSelected key={level1} onDel={() => del(selectedData)}>
            <div>
              内容标签:
              <span className={styles.tagContent}>{level1}-全部</span>
            </div>
          </FilterSelected>
        )
      }
      // 子项被部分选择的情况
      return level2?.map((level) => (
        <FilterSelected key={level} onDel={() => del(selectedData, level)}>
          <div>
            内容标签:
            <span className={styles.tagContent}>
              {level1}-{level}
            </span>
          </div>
        </FilterSelected>
      ))
    })
    setSelectedRecord(record)
  }

  // 展开或者收起功能
  useEffect(() => {
    if (debouncedValue) {
      setIsShow(ref?.current?.clientHeight > 20)
    }
  }, [debouncedValue, ref])

  // 一级标签筛选
  function onFirstTagChange(item, checked) {
    const _contentTags = [...contentTags]
    // 被选中
    if (checked) {
      const o = { level1: item.level1, level2: item.level2 }
      _contentTags.push(o)
    } else {
      // 取消选中
      const idx = _contentTags.findIndex((o) => o.level1 === item.level1)
      _contentTags.splice(idx, 1)
    }
    setContentTags(_contentTags)
    // 请求表格数据
    run(_contentTags)
  }

  // 二级标签筛选
  function onSecondTagChange(item, checkedList) {
    const _contentTags = [...contentTags]
    const idx = _contentTags.findIndex((o) => o.level1 === item.level1)
    if (checkedList.length) {
      const o = { level1: item.level1, level2: checkedList }
      if (idx === -1) {
        _contentTags.push(o)
      } else {
        _contentTags[idx] = o
      }
    } else {
      _contentTags.splice(idx, 1)
    }
    setContentTags(_contentTags)
    // 请求表格数据
    run(_contentTags)
  }

  // 获取被选中的子项
  function getCheckedList(item) {
    return contentTags.find((o) => o.level1 === item.level1)?.level2
  }

  function handleCollapse() {
    setCollapse(!collapse)
  }

  return (
    <FilterRow title="内容标签">
      <div ref={ref} className={classNames(styles.content)}>
        <div className={classNames(collapse && styles.hidden)}>
          {options.map((item) =>
            item.level2?.length ? (
              <Popover
                overlayClassName={styles.popoverPro}
                key={item.level1}
                placement="bottom"
                content={
                  <Checkbox.Group
                    onChange={(checkedList) =>
                      onSecondTagChange(item, checkedList)
                    }
                    value={getCheckedList(item)}>
                    {item.level2?.map((str) => (
                      <Checkbox
                        className={styles.checkColor}
                        key={str}
                        value={str}>
                        {str}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                }>
                <CheckableTag
                  checked={contentTags.some(
                    (tag) => item.level1 === tag.level1
                  )}
                  className={styles.tag}
                  onChange={(checked) => onFirstTagChange(item, checked)}>
                  {item.level1}
                </CheckableTag>
              </Popover>
            ) : (
              <CheckableTag
                checked={contentTags.some((tag) => item.level1 === tag.level1)}
                className={styles.tag}
                onChange={(checked) => onFirstTagChange(item, checked)}>
                {item.level1}
              </CheckableTag>
            )
          )}
          {/* 逻辑控制展开或收起 */}
          {isShow && (
            <Typography.Link
              className={styles.collapse}
              onClick={handleCollapse}>
              {collapse ? '展开' : '收起'}
            </Typography.Link>
          )}
        </div>
      </div>
    </FilterRow>
  )
}
export default ContentTag
