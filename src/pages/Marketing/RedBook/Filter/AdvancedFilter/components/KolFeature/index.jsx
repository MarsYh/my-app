import { Checkbox, Select, Tag } from 'antd'
import React from 'react'
import FilterRow from '../../../../../../Resource/components/FilterRow'
import styles from './index.module.less'
import {
  KOL_TYPE_CONFIG,
  FANS_NUM_CONFIG,
  AREA_CONFIG,
  AGE_PERCENT_CONFIG,
  CITY_PERCENT_CONFIG,
  KOL_PRICE_CONFIG,
} from '../../../sourceData'

function KolFeature() {
  const { CheckableTag } = Tag
  const { Option } = Select
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.title}>达人信息</span>
        <div className={styles.info}>
          <FilterRow title="粉丝数量">
            <div className={styles.content}>
              {FANS_NUM_CONFIG.map((item) => (
                <CheckableTag key={item.value}>{item.label}</CheckableTag>
              ))}
            </div>
          </FilterRow>
          <FilterRow title="达人性别">
            <div className={styles.content}>
              <CheckableTag>女</CheckableTag>
              <CheckableTag>男</CheckableTag>
            </div>
          </FilterRow>
          <FilterRow title="达人属性">
            <div className={styles.content}>
              {KOL_TYPE_CONFIG.map((item) => (
                <CheckableTag key={item.value}>{item.label}</CheckableTag>
              ))}
            </div>
          </FilterRow>
          <FilterRow title="所在地域">
            <div className={styles.content}>
              <Select
                placeholder="请选择"
                style={{
                  width: 120,
                }}>
                {AREA_CONFIG.map((item) => (
                  <Option key={item.value}>
                    <Checkbox>{item.label}</Checkbox>
                  </Option>
                ))}
              </Select>
            </div>
          </FilterRow>
          <FilterRow title="达人来源">
            <div className={styles.content}>
              <CheckableTag>蒲公英</CheckableTag>
              <CheckableTag>非蒲公英</CheckableTag>
            </div>
          </FilterRow>
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.title}>粉丝画像</span>
        <div className={styles.info}>
          <FilterRow title="粉丝性别">
            <div className={styles.content}>
              <CheckableTag>男粉偏多</CheckableTag>
              <CheckableTag>女粉偏多</CheckableTag>
            </div>
          </FilterRow>
          <FilterRow title="粉丝年龄">
            <div className={styles.content}>
              {AGE_PERCENT_CONFIG.map((item) => (
                <CheckableTag key={item.value}>{item.label}</CheckableTag>
              ))}
            </div>
          </FilterRow>
          <FilterRow title="粉丝地域">
            <div className={styles.content}>
              <Select
                placeholder="请选择"
                style={{
                  width: 120,
                }}>
                {CITY_PERCENT_CONFIG.map((item) => (
                  <Option key={item.value}>
                    <div>{item.label}</div>
                  </Option>
                ))}
              </Select>
            </div>
          </FilterRow>
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.title}>商业合作</span>
        <div className={styles.info}>
          <FilterRow title="达人报价">
            <div className={styles.content}>
              <Select
                placeholder="请选择"
                style={{
                  width: 120,
                }}>
                <Option value="picture">
                  <div>图文</div>
                </Option>
                <Option value="video">
                  <div>视频</div>
                </Option>
              </Select>
              <div className={styles.tags}>
                <div className={styles.tag}>
                  {KOL_PRICE_CONFIG.map((item) => (
                    <CheckableTag key={item.value}>{item.label}</CheckableTag>
                  ))}
                </div>
              </div>
            </div>
          </FilterRow>
        </div>
      </div>
    </div>
  )
}

export default KolFeature
