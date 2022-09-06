// 投放结案管理
import React from 'react'
import { Link } from 'react-router-dom'
import imgResource from '../../assets/icon-resource.svg'
import styles from './index.module.less'
import IconTikTok from '../../assets/icon-tiktok.svg'
import IconRedbook from '../../assets/icon-redbook.svg'
import IconWeibo from '../../assets/icon-weibo.svg'
import IconWechat from '../../assets/icon-wechat.svg'
import IconBilibili from '../../assets/icon-bilibili.svg'
import Redbook from '../Redbook'

import { Tabs, Space } from 'antd'
// import {WechatOutlined} from '@ant-design/icons'

const onChange = (key) => {
  console.log(key)
}

const Manage = () => (
  <div>
    <div className={styles.resource}>
      <img className="resource" src={imgResource} alt="" />
    </div>
    <Space>
      <Tabs
        defaultActiveKey="2"
        onChange={onChange}
        items={[
          {
            label: `抖音`,
            // icon: <WechatOutlined />,
            key: '1',
            children: `抖音`,
          },
          {
            label: <Link to="/resource/redbook">小红书</Link>,
            icon: <Redbook />,
            key: '2',
            children: `小红书`,
          },
          {
            label: `微博`,
            key: '3',
            children: `微博`,
          },
          {
            label: `微信`,
            key: '4',
            children: `微信`,
          },
          {
            label: `Bilibili`,
            key: '5',
            children: `Bilibili`,
            disabled: true,
          },
        ]}
      />
    </Space>
  </div>
)

export default Manage
