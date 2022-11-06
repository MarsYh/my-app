import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Modal, Form, Select, Button, message } from "antd";
import styles from "./index.module.less";
import { reqDeptList, reqGetBindCode } from "@/api/companyManage";
import UserBindAccountModal from "../UserBindAccountModal";

function UserAccountModal(props, ref) {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [bindCode, setBindCode] = useState();
  const { Option } = Select;
  const userBindAccountRef = useRef();

  function handleOk() {
    setIsModalOpen(false);
  }
  function handleCancel() {
    setIsModalOpen(false);
  }
  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(roleList) {
        // 设置打开
        setIsModalOpen(true);
        setRoleList(roleList);
        getDeptList();
        form.resetFields()
      },
    };
  });

  function getDeptList() {
    reqDeptList({}).then((res) => {
      const { success, message: msg, data } = res;
      if (success && data) {
        setDeptList(data.records);
      } else {
        message.error(msg || "获取部门列表失败");
      }
    });
  }

  function handleBind() {
    form
      .validateFields()
      .then((checkValues) => {
        userBindAccountRef?.current.open({roleList, deptList, checkValues});
        setIsModalOpen(false);
      })
      .catch((err) => {
        message.error("请选择有效的值");
      });
  }

  function handleGetBindCode() {
    form.validateFields().then(async (params) => {
      const res = await reqGetBindCode(params);
      const { data, success, message: msg } = res;
      if (success && data) {
        setBindCode(data);
      } else {
        message.error(msg || "生成绑定码失败");
      }
    });
  }

  function reset(){
    userBindAccountRef.current?.close()
    setIsModalOpen(true)
  }

  return (
    <Modal
      width={433}
      title="添加子账号"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        bindCode ? (
          <div>
            <Button onClick={()=>setBindCode()}>重置</Button>
            <Button onClick={()=>{
              setIsModalOpen(false)
              setBindCode('')
            }}>取消</Button>
          </div>
        ) : (
          <div className={styles.btnBox}>
            <Button onClick={handleBind}>直接绑定</Button>
            <Button onClick={handleGetBindCode}>生成绑定码</Button>
          </div>
        )
      }
    >
      {bindCode ? (
        <div>{bindCode}</div>
      ) : (
        <div>
          <Form form={form}>
            <Form.Item
              name="roleUuid"
              label="选择角色"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="请选择角色">
                {roleList?.map((item) => (
                  <Option key={item.roleUuid} value={item.roleUuid}>
                    {item.roleName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="deptUuid"
              label="选择部门"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="请选择部门">
                {deptList?.map((item) => (
                  <Option key={item.uuid} value={item.uuid}>
                    {item.deptName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      )}
      <UserBindAccountModal ref={userBindAccountRef} reset={reset}/>
    </Modal>
  );
}

export default forwardRef(UserAccountModal);
