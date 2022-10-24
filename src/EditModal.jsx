import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal } from "antd";

const EditModal = (props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open:(str)=>{
        console.log("str:",str)
        setVisible(true)
    }
  }));

  return (
    <Modal title="编辑" visible={visible} onCancel={() => setVisible(false)}>
      编辑弹窗adsfadsfasdf
    </Modal>
  );
};

export default forwardRef(EditModal);
