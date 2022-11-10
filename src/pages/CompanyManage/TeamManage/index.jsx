import { Button, Input, Space, Table } from 'antd'
import React from 'react'
import styles from './index.module.less'
import IconSearch from '../UserManage/img/icon-search.svg'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

function TeamManage() {
  const columns = []
  return (
    <div className={styles.container}>
      <div className={styles.teamHead}>
        <div className={styles.searchBox}>
          <Input
            className={styles.inputBox}
            allowClear
            placeholder="请输入团队名称进行搜索"
            addonBefore="用户搜索"
            suffix={<img src={IconSearch} alt="" />}
          />
        </div>
        <Space className={styles.btnGroup}>
          <Button disabled>
            <DeleteOutlined />
            <span>批量删除</span>
          </Button>
          <Button type="primary">
            <PlusOutlined />
            <span>新建团队</span>
          </Button>
        </Space>
      </div>
      <div>
        <Table
          columns={columns}
          rowKey={'uuid'}
          // onChange={onTableChange}
        />
      </div>
    </div>
  )
}

export default TeamManage
