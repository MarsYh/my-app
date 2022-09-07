// 小红书界面表格管理
import { Checkbox, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import styles from './index.module.less'

const List = () => {
  return (
    <div className={styles.list}>
      <div className={styles.head}>
        <table>
          <thead>
            <Checkbox />
            <th>达人信息</th>
            <th>粉丝数量</th>
            <th>近30日图文合作笔记预期CPM</th>
            <th>近30日图文合作笔记预期CPE</th>
            <th>近30日平均阅读量</th>
            <th>近30日平均互动量</th>
            <th>近30日作品互动率</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr>
              <Checkbox />
              <td>
                <Avatar icon={<UserOutlined />} />
                赵露思
              </td>
              <td>1.6w</td>
              <td>20</td>
              <td>15</td>
              <td>15</td>
              <td>43.6w</td>
              <td>15.3w</td>
            </tr>
            <tr className={styles.second}>
              <Checkbox />
              <td>
                <Avatar icon={<UserOutlined />} />
                赵露思
              </td>
              <td>1.6w</td>
              <td>20</td>
              <td>15</td>
              <td>15</td>
              <td>43.6w</td>
              <td>15.3w</td>
            </tr>
            <tr>
              <Checkbox />
              <td>
                <Avatar icon={<UserOutlined />} />
                赵露思
              </td>
              <td>1.6w</td>
              <td>20</td>
              <td>15</td>
              <td>15</td>
              <td>43.6w</td>
              <td>15.3w</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List
