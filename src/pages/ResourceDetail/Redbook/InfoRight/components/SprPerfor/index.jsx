import React from 'react'
import { Select } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
// import { reqXhsBasic } from '@/api/resourceDetail'
const { Option } = Select

const handleChange = (value) => {
  console.log(`selected ${value}`)
}
function SprPerfor() {
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
            <button className={styles.oneMonth}>近30天</button>
            <button className={styles.threeMonths}>近90天</button>
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
              <div className={styles.keyWords}>发布笔记数</div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>6.5%</div>
              <div className={styles.keyWords}>
                互动率
                <QuestionCircleOutlined />
              </div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>17.9%</div>
              <div className={styles.keyWords}>
                视频完播率
                <QuestionCircleOutlined />
              </div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.number}>3122622</div>
              <div className={styles.keyWords}>
                阅读量中位数
                <QuestionCircleOutlined />
              </div>
            </div>
          </div>
          <div className={styles.secondRow}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SprPerfor
