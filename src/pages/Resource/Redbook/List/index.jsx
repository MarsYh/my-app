// 小红书列表
import { Tag, Table, Space, Avatar,Divider,Button } from 'antd';
import React, { useState } from 'react';
import styles from "./index.module.less"
const columns = [
  {
    title: '达人信息',
    fixed: 'left',
    width: 350,
    ellipsis: true,
    dataIndex: 'info',
    render: (text,record,index) => {
      return <Space>
        <Avatar src={record.headUrl} size={32} />
        <div className={styles.infoRight}>
          <div className={styles.baseInfo}>
            <span>{text}</span>
            <Tag>LV3</Tag>
            <img src="" />
            <img src="" />
          </div>
          <div className={styles.locationInfo}>
            <span>四川成都</span>
            <Divider type="vertical" />
            <span><img src="" />大禹机构</span>
            <Divider type="vertical" />
            <span>年框签约-新榜</span>
          </div>
          <div className={styles.tagInfo}>
            <div>美妆-护肤</div>
            <div>vlog</div>
            <div>ootd</div>
            <div>+3</div>
          </div>
        </div>
      </Space>
    },
  },
  {
    title: '粉丝数量',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日图文合作笔记预期CPM',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日图文合作笔记预期CPE',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日阅读中位数',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日互动中位数',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日作品互动率',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日作品完播率',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日商单笔记数（合作笔记数）',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日粉丝增长量',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日粉丝增长率',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '图文笔记一口价',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '视频笔记一口价',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',
    dataIndex: 'address',
  },
];
const data = [
  {address:"123",info:"小明1"},
  {address:"123",info:"小明2"},
  {address:"123",info:"小明3"},
  {address:"123",info:"小明4"},
  {address:"123",info:"小明5"},
  {address:"123",info:"小明6"},
  {address:"123",info:"小明7"},
  {address:"123",info:"小明8"},
  {address:"123",info:"小明9"},
  {address:"123",info:"小明10"},
]; 


const List = () => {
  const [selectedRowKeys,setSelectedRowKeys] = useState([])

  return (
    <div className={styles.tableBox}>
      <Divider />
      <div className={styles.tableHead}>
        xxxx
        <Button type="primary" disabled={!selectedRowKeys.length}>批量添加</Button>
      </div>
      <Table
        rowKey="info"
        rowSelection={{
          selectedRowKeys,
          onChange(keys){
            setSelectedRowKeys(keys)
          }
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          showQuickJumper:true,
          showSizeChanger:[10,20,30,60,100],
          pageSize:20,
          current:1,
          total:data.length
        }}
        scroll={{
          x: 1000,
          y: 600
        }}
      />
    </div>
  );
};

export default List;