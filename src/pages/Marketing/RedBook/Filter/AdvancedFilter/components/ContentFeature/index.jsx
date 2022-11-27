import React, { useState } from 'react'
import styles from './index.module.less'
import FilterRow from '@/pages/Marketing/components/FilterRow'
import { Checkbox, Popover, Tag, Tooltip } from 'antd'
import { QuestionCircleOutlined, CaretDownOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import {
  CONTENT_FEATURE_CONFIG,
  CONTENT_FEATURE_ITEM_CONFIG,
  COMMENT_COMPONENTS_CONFIG,
  CONTENT_FEATURE_LIST_CONFIG,
} from '../../../sourceData'

function ContentFeature() {
  const { CheckableTag } = Tag
  const [visible, setVisible] = useState(false)

  return (
    <>
      <FilterRow title="内容分类">
        <div className={classNames(styles.content, styles.bottom)}>
          {CONTENT_FEATURE_CONFIG.map((item) => (
            <Popover
              overlayClassName={styles.popoverPro}
              key={item.label}
              placement="bottom"
              content={
                <Checkbox.Group>
                  {CONTENT_FEATURE_ITEM_CONFIG.map((str) => (
                    <Checkbox
                      className={styles.checkColor}
                      key={str.value}
                      value={str.value}>
                      {str.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              }>
              <CheckableTag className={styles.tag}>{item.label}</CheckableTag>
            </Popover>
          ))}
        </div>
      </FilterRow>
      <FilterRow title="内容形式">
        <div className={styles.options}>
          <CheckableTag>图文</CheckableTag>
          <CheckableTag>视频</CheckableTag>
        </div>
      </FilterRow>
      <FilterRow title="评论区组件">
        <div className={styles.content} style={{ marginBottom: '13px' }}>
          <Tooltip
            overlayClassName={styles.toolTip}
            title="即将开放，敬请期待！">
            <div className={styles.tagList}>
              {COMMENT_COMPONENTS_CONFIG.map((item) => (
                <div className={styles.disabledTag} key={item.value}>
                  <span>{item.label}</span>
                  <QuestionCircleOutlined style={{ paddingLeft: '4px' }} />
                </div>
              ))}
            </div>
          </Tooltip>
        </div>
      </FilterRow>
      <FilterRow title="内容特征">
        <div className={styles.content}>
          <div className={styles.btnList}>
            {CONTENT_FEATURE_LIST_CONFIG.map((item) => (
              <Popover
                onVisibleChange={(item) => setVisible(item)}
                trigger="click"
                placement="bottom"
                key={item.value}
                overlayClassName={styles.popover}
                content={
                  <Checkbox.Group>
                    {CONTENT_FEATURE_ITEM_CONFIG.map((str) => (
                      <Checkbox
                        className={styles.checkColor}
                        key={str.value}
                        value={str.value}>
                        {str.label}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                }>
                <div className={styles.btn}>
                  <span>{item.label}</span>
                  <CaretDownOutlined
                    className={classNames(
                      visible ? styles.rotate : styles.rotateReverse
                    )}
                  />
                </div>
              </Popover>
            ))}
          </div>
        </div>
      </FilterRow>
    </>
  )
}

export default ContentFeature
