import React, { useState } from "react";
import styles from "./index.module.less";
import InfoLeft from "./InfoLeft";
import InfoRight from "./InfoRight";
import { BTNS_CONFIG } from "./sourceData";
import { useLocation, useNavigate } from "react-router-dom";
import context from "./context";

const { Provider } = context;

const Info = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  // 当前选中的按钮选项
  const [checked, setChecked] = useState(getInitChecked());

  // 获取初始化的checked选项
  function getInitChecked() {
    const paramsList = search.split("&");
    const params = paramsList.find((params) => params.includes("type="));
    if (!params) {
      return BTNS_CONFIG[0].value;
    } else {
      const str = params.split("type=").pop();
      return str;
    }
  }

  // 修改checked值得方法
  function dispatch(item) {
    // 改当前选中的checked的值
    setChecked(item.value);
    // 改地址栏的值
    // 修改参数值
    let newSearch =
      search
        .split("&")
        .filter((params) => !params.includes("type="))
        .join("&") + `&type=${item.value}`;
    if (!newSearch.includes("?")) {
      newSearch = `?${newSearch}`;
    }
    const href = `${pathname}${newSearch}`;
    navigate(href);
  }

  return (
    <Provider value={{ checked, dispatch }}>
      <div className={styles.infoBox}>
        <InfoLeft />
        <InfoRight />
      </div>
    </Provider>
  );
};

export default Info;
