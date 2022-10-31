import {
  Input,
  Select,
  Button,
  Table,
  message,
  Avatar,
  Space,
  Drawer,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.less";
import IconSearch from "./img/icon-search.svg";
import { reqUserManage, reqUserNum } from "@/api/companyManage";
import {
  CloseCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { CHARACTER_TYPE_CONFIG } from "./sourceData";
import classNames from "classnames"

function UserManage() {
  const userManageDrawerRef = useRef();

  const { Option } = Select;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [edit, setEdit] = useState();
  const [userLoading,setUserLoading] = useState(false)

  // function renderNickName(record) {
  //   return (
  //     <Space>
  //       <Avatar src={record.headUrl} />
  //       <span>{record.nickName}</span>
  //     </Space>
  //   );
  // }

  // 任务内容列表接口请求参数
  const [params, setParams] = useState({
    current: 1,
    size: 15,
  });
  // 各部门人数接口请求参数
  const [numParams, setNumParams] = useState({});
  // 部门人数
  const [deptData, setDeptData] = useState([]);
  // 列表数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  });

  // 处理左侧部门数据
  function filterDeptCountList(list) {
    if (!list || !list.length) return [];
    // 1. 算出全部
    // 2. 把全部的那条数据加入到结果列表中
    const result = [];
    let sum = 0;
    list.forEach((item) => {
      const { adPostBuyUserDept, count } = item;
      sum += count;
      const o = {
        deptName: adPostBuyUserDept.deptName,
        uuid: adPostBuyUserDept.uuid,
        count,
      };
      result.push(o);
    });
    result.unshift({ deptName: "全部", uuid: "", count: sum });
    return result;
  }
  useEffect(() => {
    setUserLoading(true)
    reqUserManage(params).then((res) => {
      const { data, success, message: msg } = res;
      if (success && data) {
        setTableData({
          list: data.records,
          total: data.total,
        });
      } else {
        message.error(msg || "获取列表数据失败");
      }
    }).finally(()=>setUserLoading(false));
  }, [params]);

  useEffect(() => {
    reqUserNum().then((res) => {
      // console.log('numParams', numParams)
      const { data, success, message: msg } = res;
      if (success && data) {
        const _deptCountList = filterDeptCountList(data.deptCountList);
        setDeptData(_deptCountList);
      } else {
        message.error(msg || "获取各部门人数失败");
      }
    });
  }, []);

  function onTableChange(pagin, filters, sorter) {
    const o = { ...params };
    console.log(pagin);
    const { current, pageSize } = pagin;
    o.page = {
      pageNo: current,
      pageSize,
    };
    setParams(o);
  }
  function handleDepClick(value) {
    const _params = {...params}
    if(value){
     _params.deptUuid2 = value
    }else{
      delete _params.deptUuid2
    }
    setParams(_params)
  }

  function renderInName(inName) {
    return inName ? (
      <Space className={styles.inName}>
        {inName}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: "hidden",
          }}
        />
      </Space>
    ) : (
      "-"
    );
  }
  function renderDeptName(deptName) {
    return deptName ? (
      <Space className={styles.inName}>
        {deptName}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: "hidden",
          }}
        />
      </Space>
    ) : (
      "-"
    );
  }

  function renderTeam(team) {
    return team ? (
      <Space className={styles.inName}>
        {team}
        <EditOutlined
          className={styles.icon}
          style={{
            display: "none",
          }}
        />
      </Space>
    ) : (
      "-"
    );
  }

  // 渲染编辑按钮
  function renderEdit(name, editKey) {
    return name ? (
      <Space
        className={styles.inName}
        onMouseEnter={() => setEdit(editKey)}
        onMouseLeave={() => setEdit()}
      >
        {name}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: edit === editKey ? "visible" : "hidden",
          }}
        />
      </Space>
    ) : (
      "-"
    );
  }

  const columns = [
    {
      title: "用户昵称",
      dataIndex: "nickName",
      key: "nickName",
      ellipsis: true,
      width: 100,
      // render: (_, record) => renderNickName(record),
      render: (text, { headUrl }) => (
        <Space>
          <Avatar src={headUrl} />
          <span>{text || "-"}</span>
        </Space>
      ),
    },
    {
      title: "用户姓名",
      dataIndex: "inName",
      key: "inName",
      ellipsis: true,
      width: 100,
      // render: (text) => renderInName(text),
      render: (text, record) => renderEdit(text, `inName_${record.uuid}`),
    },
    {
      title: "所属部门",
      dataIndex: "deptName",
      key: "deptName",
      ellipsis: true,
      width: 170,
      // render: (text) => renderDeptName(text),
      render: (text, record) => renderEdit(text, `deptName_${record.uuid}`),
    },
    {
      title: "所属团队",
      dataIndex: "team",
      key: "team",
      ellipsis: true,
      width: 100,
      render: (text) => renderTeam(text),
    },
    {
      title: "角色类型",
      dataIndex: "roleName",
      key: "roleName",
      ellipsis: true,
      width: 100,
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
      key: "gmtCreate",
      ellipsis: true,
      width: 100,
    },
    {
      title: "操作",
      dataIndex: "edit",
      key: "edit",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span onClick={() => userManageDrawerRef.current.open(record)}>
            编辑
          </span>
          <span>解绑</span>
        </>
      ),
    },
  ];
  const { deptCountList = {} } = numParams;

  function isDeptNameChecked(item){
    // uuid匹配的情况
    if(params.deptUuid2 === item.uuid){
      return true
    }

    // 是全部
    if(!params.deptUuid2 && item.deptName === '全部'){
      return true
    }

    return false
  }

  const suffix = (
    <div>
      <CloseCircleOutlined style={{ color: "#fff" }} />
      <img src={IconSearch} alt="" />
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        {/* <div className={styles.leftItem}>
          <Space size={16}>
            <span className={styles.depName}>全部</span>
            <span>{tableData.total}</span>
          </Space>
        </div> */}
        {deptData.map((item) => (
            <div
              key={item.uuid}
              className={classNames(isDeptNameChecked(item) && styles.checkd)}
              onClick={() => handleDepClick(item.uuid)}
            >
                <span>{item.deptName}</span>
                <span>{item.count}</span>
            </div>
          // <div className={styles.leftItem}>
          //   <div
          //     key={item.uuid}
          //     className={styles.depName}
          //     onClick={() => handleDepClick(item.uuid)}
          //   >
          //       <span className={styles.depName}>{item.deptName}</span>
          //       <span>{item.count}</span>
          //   </div>
          // </div>
        ))}
      </div>
      <div className={styles.rightBox}>
        <div className={styles.header}>
          <div className={styles.filter}>
            <div className={styles.userSearch}>
              <span>用户搜索</span>
              <Input
                suffix={suffix}
                placeholder="请输入用户昵称或姓名进行搜索"
              />
            </div>
            <div className={styles.characterType}>
              <span>角色类型</span>
              <Select
                placeholder="请选择角色类型"
                style={{
                  width: 224,
                }}
              >
                {CHARACTER_TYPE_CONFIG.map((item) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </div>
            <div className={styles.clearFilter}>清空筛选</div>
          </div>
          <div className={styles.btnGroup}>
            <Button type="primary" disabled={!selectedRowKeys.length}>批量处理</Button>
            <Button type="primary">
              <PlusOutlined />
              <span>添加子账号</span>
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <Table
            rowKey="uuid"
            loading={userLoading}
            onChange={onTableChange}
            dataSource={tableData.list}
            columns={columns}
            showSorterTooltip={false}
            rowSelection={{
              selectedRowKeys,
              onChange(keys) {
                setSelectedRowKeys(keys);
              },
            }}
          />
        </div>
      </div>
      <Drawer ref={userManageDrawerRef} />
    </div>
  );
}
export default UserManage;
