import React, { useState } from 'react'
import {
  Select,
  Tooltip,
  Badge,
  Radio,
  Descriptions,
  Pagination,
  ConfigProvider,
  message,
} from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'
import { QuestionCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import RectChart from '@/components/RectChart'
import { useEffect } from 'react'
import IconNote from '../../img/icon-note.jpeg'
import { reqXhsDp, reqXhsNote } from '@/api/resourceDetail'
import {
  SORT_CONFIG,
  DATE_CONFIG,
  NOTE_CONFIG,
  BUSINESS_CONFIG,
} from './sourceData'
const { Option } = Select
const options = [
  {
    label: '全部笔记',
    value: '1',
  },
  {
    label: '合作笔记',
    value: '2',
  },
  {
    label: '图文笔记',
    value: '3',
  },
  {
    label: '视频笔记',
    value: '4',
  },
]

const SprPerfor = () => {
  const { id } = useParams()
  // console.log('id:', id)
  const [data, setData] = useState({})
  // console.log('data:', data)
  const [state, setState] = useState(true)
  const [dataSource, setDataSource] = useState([])
  // 柱状图数据，卡片数据
  const [ncData, setNcData] = useState({
    date: [],
    rectData: {
      like: [],
      collect: [],
      read: [],
    },
    cardData: {
      list: [],
      total: 0,
    },
  })
  // 卡片柱状图请求数据
  const [ncParams, setNcParams] = useState({
    userId: id,
    type: options[0].value,
    sort: SORT_CONFIG[0].value,
    page: { pageSize: 15, pageNo: 1 },
  })

  // 日期切换请求数据
  const [dpParams, setDpParams] = useState({
    userId: id,
    business: BUSINESS_CONFIG[0].value,
    dateType: DATE_CONFIG[0].value,
    noteType: NOTE_CONFIG[0].value,
  })
  const [activeKey, setActiveKey] = useState('read')

  function handleClick(type) {
    if (activeKey === type) {
      return
    }
    setActiveKey(type)
    // 从柱状图数据所有数据里面取出对应的值
    const _dataSource = ncData.rectData[type]
    setDataSource(_dataSource)
  }
  function handleSortClick(value) {
    if (ncParams.sort === value) return
    const _ncParams = { ...ncParams }
    _ncParams.sort = value
    setNcParams(_ncParams)
  }
  function handleDateClick(value) {
    if (dpParams.dateType === value) return
    const _dpParams = { ...dpParams }
    _dpParams.dateType = value
    setDpParams(_dpParams)
  }
  function handleBusinessClick(value) {
    if (dpParams.business === value) return
    const _dpParams = { ...dpParams }
    _dpParams.business = value
    setDpParams(_dpParams)
  }

  function onTypeChange(e) {
    const _ncParams = { ...ncParams }
    _ncParams.type = e.target.value
    setNcParams(_ncParams)
  }
  function onNoteChange(value) {
    const _noteParams = { ...dpParams }
    _noteParams.noteType = value
    setDpParams(_noteParams)
  }

  function onPaginChange(page, pageSize) {
    const newNcParams = { ...ncParams }
    newNcParams.page.pageNo = page
    newNcParams.page.pageSize = pageSize
    setNcParams(newNcParams)
  }

  // 处理柱状图&卡片列表数据
  function filterRectAndCardData(data) {
    const { page, data: result } = data
    const _ncData = {
      date: [],
      rectData: {
        like: [],
        collect: [],
        read: [],
      },
      cardData: {
        list: result,
        total: page.totalSize,
      },
    }

    result.forEach((o) => {
      const { collectNum, likeNum, date, readNum } = o
      _ncData.date.push(date)
      _ncData.rectData.like.push(likeNum)
      _ncData.rectData.collect.push(collectNum)
      _ncData.rectData.read.push(readNum)
    })

    _ncData.date = filterDate(_ncData.date)

    // 初始化图表数据
    const _dataSource = _ncData.rectData[activeKey]
    setDataSource(_dataSource)
    setNcData(_ncData)
  }

  function filterDate(date) {
    const _date = [...date]
    for (let i = 0; i < _date.length; i++) {
      const current = _date[i]
      for (let j = i + 1; j < _date.length; j++) {
        const next = _date[j]
        const [cy, cm, cd] = current.split('-')
        const [ny, nm, nd] = next.split('-')

        if (ny >= cy || nm >= cm || nd > cd) {
          continue
        }
        ;[_date[i], _date[j]] = [_date[j], _date[i]]
      }
    }
    return _date.reverse().map((date) => {
      const [y, m, d] = date.split('-')
      return `${m}-${d}`
    })
  }

  useEffect(() => {
    reqXhsNote(ncParams).then((res) => {
      // console.log('res:', res)
      const { success, msg, data } = res
      if (data && success) {
        filterRectAndCardData(data)
      } else {
        message.error(msg || '案例数据获取失败')
      }
    })
  }, [ncParams])

  useEffect(() => {
    // console.log('params:', params)
    reqXhsDp(dpParams)
      .then((res) => {
        const { success, msg, data } = res
        // console.log(res)
        if (success && data) {
          setData(data)
        } else {
          message.error(msg || '请求失败')
        }
      })
      .catch((error) => {
        console.log('error:')
      })
  }, [dpParams])

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
            {DATE_CONFIG.map((item) => (
              <div
                key={item.value}
                className={classNames(
                  styles.recentDays,
                  dpParams.dateType === item.value && styles.active
                )}
                onClick={() => {
                  handleDateClick(item.value)
                }}>
                {item.label}
              </div>
            ))}

            <div className={styles.select}>
              <span className={styles.noteType}>笔记类型</span>
              <Select
                value={dpParams.noteType}
                bordered={false}
                style={{
                  width: 151,
                }}
                onChange={onNoteChange}>
                {NOTE_CONFIG.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className={styles.noteButton}>
            {BUSINESS_CONFIG.map((item) => (
              <div
                key={item.value}
                className={classNames(
                  styles.dailyNotes,
                  dpParams.business === item.value && styles.checked
                )}
                onClick={() => handleBusinessClick(item.value)}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.firstRow}>
            <div className={styles.dataBox}>
              <div className={styles.number}>{data.noteNumber}</div>
              <div className={styles.title}>发布笔记数</div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>{`${data.interactionRate}%`}</div>
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
              <div
                className={styles.number}>{`${data.videoFullViewRate}%`}</div>
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
              <div className={styles.number}>{data.readMedian}</div>
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
                <div className={styles.number}>{data.engageMedian}</div>
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
              <div className={styles.number}>{data.likeMedian}</div>
              <div className={styles.title}>中位点赞数</div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>{data.collectMedian}</div>
              <div className={styles.title}>中位收藏数</div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>{data.commentMedian}</div>
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
            <div
              className={classNames(
                styles.btn,
                activeKey === 'read' && styles.checked
              )}
              onClick={() => handleClick('read')}>
              阅读数
            </div>
            <div
              className={classNames(
                styles.btn,
                activeKey === 'collect' && styles.checked
              )}
              onClick={() => handleClick('collect')}>
              收藏数
            </div>
            <div
              className={classNames(
                styles.btn,
                activeKey === 'like' && styles.checked
              )}
              onClick={() => handleClick('like')}>
              点赞数
            </div>
          </div>
        </div>
        {/* 柱状图 */}
        <RectChart dataSource={dataSource} xData={ncData.date} />
        <div className={styles.noteCase}>
          <div className={styles.title}>
            <Badge color="#727fff" text="笔记案例" />
            <QuestionCircleOutlined size={14} style={{ margin: '0 0 0 4px' }} />
          </div>
          <div className={styles.tags}>
            <div className={styles.tagsLeft}>
              <Radio.Group
                options={options}
                onChange={onTypeChange}
                value={ncParams.type}
                optionType="button"
              />
            </div>
            <div className={styles.tagsRight}>
              {SORT_CONFIG.map((item) => (
                <div
                  key={item.value}
                  className={classNames(
                    styles.btn,
                    ncParams.sort === item.value && styles.checked
                  )}
                  onClick={() => handleSortClick(item.value)}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.noteContent}>
            <Descriptions layout="vertical">
              <Descriptions.Item
                label={
                  <div className={styles.imgContent}>
                    <div className={styles.noteImg}>
                      <a href="#">
                        <img
                          src={IconNote}
                          alt=""
                          width="100%"
                          height="100%"
                          // referrerpolicy="no-referrer"
                        />
                      </a>
                    </div>
                    <div className={styles.viewTitle}>
                      <a href="#">机关单位穿搭 | 比较吃香的公务员岗位有哪些</a>
                    </div>
                    <div className={styles.viewTime}>
                      <span className={styles.timeText}>发布时间</span>
                      <span>2022-04-20 11:41:20</span>
                    </div>
                    <div className={styles.counts}>
                      <div className={styles.countList}>
                        <p className={styles.iconWatch}></p>
                        <span>245.16w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconLike}></p>
                        <span>12.55w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconCollect}></p>
                        <span>3.68w</span>
                      </div>
                    </div>
                  </div>
                }></Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={styles.imgContent}>
                    <div className={styles.noteImg}>
                      <a href="#">
                        <img
                          src={IconNote}
                          alt=""
                          width="100%"
                          height="100%"
                          // referrerpolicy="no-referrer"
                        />
                      </a>
                    </div>
                    <div className={styles.viewTitle}>
                      <a href="#">机关单位穿搭 | 比较吃香的公务员岗位有哪些</a>
                    </div>
                    <div className={styles.viewTime}>
                      <span className={styles.timeText}>发布时间</span>
                      <span>2022-04-20 11:41:20</span>
                    </div>
                    <div className={styles.counts}>
                      <div className={styles.countList}>
                        <p className={styles.iconWatch}></p>
                        <span>245.16w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconLike}></p>
                        <span>12.55w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconCollect}></p>
                        <span>3.68w</span>
                      </div>
                    </div>
                  </div>
                }></Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={styles.imgContent}>
                    <div className={styles.noteImg}>
                      <a href="#">
                        <img
                          src={IconNote}
                          alt=""
                          width="100%"
                          height="100%"
                          // referrerpolicy="no-referrer"
                        />
                      </a>
                    </div>
                    <div className={styles.viewTitle}>
                      <a href="#">机关单位穿搭 | 比较吃香的公务员岗位有哪些</a>
                    </div>
                    <div className={styles.viewTime}>
                      <span className={styles.timeText}>发布时间</span>
                      <span>2022-04-20 11:41:20</span>
                    </div>
                    <div className={styles.counts}>
                      <div className={styles.countList}>
                        <p className={styles.iconWatch}></p>
                        <span>245.16w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconLike}></p>
                        <span>12.55w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconCollect}></p>
                        <span>3.68w</span>
                      </div>
                    </div>
                  </div>
                }></Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={styles.imgContent}>
                    <div className={styles.noteImg}>
                      <a href="#">
                        <img
                          src={IconNote}
                          alt=""
                          width="100%"
                          height="100%"
                          // referrerpolicy="no-referrer"
                        />
                      </a>
                    </div>
                    <div className={styles.viewTitle}>
                      <a href="#">机关单位穿搭 | 比较吃香的公务员岗位有哪些</a>
                    </div>
                    <div className={styles.viewTime}>
                      <span className={styles.timeText}>发布时间</span>
                      <span>2022-04-20 11:41:20</span>
                    </div>
                    <div className={styles.counts}>
                      <div className={styles.countList}>
                        <p className={styles.iconWatch}></p>
                        <span>245.16w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconLike}></p>
                        <span>12.55w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconCollect}></p>
                        <span>3.68w</span>
                      </div>
                    </div>
                  </div>
                }></Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={styles.imgContent}>
                    <div className={styles.noteImg}>
                      <a href="#">
                        <img
                          src={IconNote}
                          alt=""
                          width="100%"
                          height="100%"
                          // referrerpolicy="no-referrer"
                        />
                      </a>
                    </div>
                    <div className={styles.viewTitle}>
                      <a href="#">机关单位穿搭 | 比较吃香的公务员岗位有哪些</a>
                    </div>
                    <div className={styles.viewTime}>
                      <span className={styles.timeText}>发布时间</span>
                      <span>2022-04-20 11:41:20</span>
                    </div>
                    <div className={styles.counts}>
                      <div className={styles.countList}>
                        <p className={styles.iconWatch}></p>
                        <span>245.16w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconLike}></p>
                        <span>12.55w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconCollect}></p>
                        <span>3.68w</span>
                      </div>
                    </div>
                  </div>
                }></Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className={styles.imgContent}>
                    <div className={styles.noteImg}>
                      <a href="#">
                        <img
                          src={IconNote}
                          alt=""
                          width="100%"
                          height="100%"
                          // referrerpolicy="no-referrer"
                        />
                      </a>
                    </div>
                    <div className={styles.viewTitle}>
                      <a href="#">机关单位穿搭 | 比较吃香的公务员岗位有哪些</a>
                    </div>
                    <div className={styles.viewTime}>
                      <span className={styles.timeText}>发布时间</span>
                      <span>2022-04-20 11:41:20</span>
                    </div>
                    <div className={styles.counts}>
                      <div className={styles.countList}>
                        <p className={styles.iconWatch}></p>
                        <span>245.16w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconLike}></p>
                        <span>12.55w</span>
                      </div>
                      <div className={styles.countList}>
                        <p className={styles.iconCollect}></p>
                        <span>3.68w</span>
                      </div>
                    </div>
                  </div>
                }></Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <ConfigProvider locale={zh_CN}>
          <Pagination
            current={ncParams.page.pageNo}
            pageSize={ncParams.page.pageSize}
            total={ncData.cardData.total}
            className={styles.pagination}
            onChange={onPaginChange}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
export default SprPerfor
