import React, { useState } from 'react'
import { Select, Tooltip, Badge } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import classNames from 'classnames'
import RectChart from '@/components/RectChart'
import { useEffect } from 'react'
// import { reqXhsBasic } from '@/api/resourceDetail'
const { Option } = Select

const handleChange = (value) => {
  console.log(`selected ${value}`)
}

function SprPerfor() {
  const [state, setState] = useState(true)

  const [dataSource,setDataSource] = useState([120, 200, 150, 80, 70, 110, 130])

  return (
    <div className={styles.infoRight}>
      <div className={styles.time}>
        <div>
          时间范围:
          <span>2022/08/01-2022/08/31</span>
        </div>
        <div>
          数据更新时间:
          <span>2022-08-31 20:33:59</span>
        </div>
      </div>
      <div className={styles.dataInfo}>
        <div className={styles.dataHead}>达人概览</div>
        <div className={styles.button}>
          <div className={styles.timeButton}>
            <div
              className={classNames(styles.recentDays, styles.checked)}
              onClick={() => {
                setState(true)
              }}>
              近30天
            </div>
            <div
              className={styles.recentDays}
              onClick={() => {
                setState(false)
              }}>
              近90天
            </div>
            <div className={styles.select}>
              <span className={styles.noteType}>笔记类型</span>
              <Select
                bordered={false}
                defaultValue="图文+视频笔记"
                style={{
                  width: 151,
                }}
                onChange={handleChange}>
                <Option value="图文+视频笔记">图文+视频笔记</Option>
                <Option value="图文笔记">图文笔记</Option>
                <Option value="视频笔记">视频笔记</Option>
              </Select>
            </div>
          </div>
          <div className={styles.noteButton}>
            <div className={styles.dailyNotes}>日常笔记</div>
            <div className={styles.cooperationNotes}>合作笔记</div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.firstRow}>
            <div className={styles.dataBox}>
              <div className={styles.number}>3557</div>
              <div className={styles.title}>发布笔记数</div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>6.5%</div>
              <div className={styles.title}>
                互动率
                <Tooltip
                  title={
                    <div>选择统计时间周期内的视频被点赞、评论、转发的概率</div>
                  }>
                  <QuestionCircleOutlined
                    size={14}
                    style={{ margin: '0 0 0 4px' }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>17.9%</div>
              <div className={styles.title}>
                视频完播率
                <Tooltip
                  title={<div>选择统计时间周期内的视频被完整播放的概率</div>}>
                  <QuestionCircleOutlined
                    size={14}
                    style={{ margin: '0 0 0 4px' }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>3,122,622</div>
              <div className={styles.title}>
                阅读量中位数
                <Tooltip
                  title={
                    <div>选择统计时间周期内的视频处于中位水平的阅读量</div>
                  }>
                  <QuestionCircleOutlined
                    size={14}
                    style={{ margin: '0 0 0 4px' }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={styles.secondRow}>
            <div className={styles.dataBox}>
              <div className={styles.listBox}>
                <div className={styles.number}>187,506</div>
                <div className={styles.title}>
                  互动中位数
                  <Tooltip
                    title={
                      <div>选择统计时间周期内的笔记处于中位水平的互动量</div>
                    }>
                    <QuestionCircleOutlined
                      size={14}
                      style={{ margin: '0 0 0 4px' }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>143,522</div>
              <div className={styles.title}>中位点赞数</div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>40,166</div>
              <div className={styles.title}>中位收藏数</div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>3,818</div>
              <div className={styles.title}>中位评论数</div>
            </div>
          </div>
        </div>
        <div className={styles.dataList}>
          <div>
            <Badge color="#727fff" text="近期笔记趋势" />
            <Tooltip
              title={
                <div>
                  筛选时间范围内,博主最近发布笔记(最多显示10篇)的数据趋势
                </div>
              }>
              <QuestionCircleOutlined
                size={14}
                style={{ margin: '0 0 0 4px' }}
              />
            </Tooltip>
          </div>
          <div className={styles.btnGroup}>
            <div className={styles.btn} onClick={() => setDataSource([1220, 2020, 1150, 801, 723, 1120, 130])}>阅读数</div>
            <div className={styles.btn} onClick={() => setDataSource([120, 200, 1150, 801, 723, 1120, 130])}>收藏数</div>
            <div className={styles.btn} onClick={() => setDataSource([120, 208, 888, 223, 452, 234, 111])}>点赞数</div>
          </div>
        </div>

        {/* 柱状图 */}
        <RectChart  dataSource={dataSource}/>
      </div>
    </div>
  )
}
export default SprPerfor
