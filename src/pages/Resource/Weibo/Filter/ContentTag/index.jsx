// 内容标签
import React from 'react'
import styles from './index.module.less'
import { Popover, Checkbox, Tag } from 'antd'
import { CONTENT_TAG_CONFIG } from './sourceData'
import FilterRow from '../../../components/FilterRow'

function ContentTag() {
  const { CheckableTag } = Tag
  return (
    <FilterRow title="内容标签">
      <div className={styles.content}>
        <div>
          {CONTENT_TAG_CONFIG.map((item) =>
            item.level2?.length ? (
              <Popover
                overlayClassName={styles.popoverPro}
                key={item.level1}
                placement="bottom"
                content={
                  <Checkbox.Group>
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
                <CheckableTag className={styles.tag}>
                  {item.level1}
                </CheckableTag>
              </Popover>
            ) : (
              <CheckableTag className={styles.tag}>{item.level1}</CheckableTag>
            )
          )}
        </div>
      </div>
    </FilterRow>
  )
}
export default ContentTag
