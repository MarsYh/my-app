import React, { useState } from "react";
import styles from "./index.module.less";
import SearchType from "./SearchType";
import KolResource from "./KolResource";
import Condition from "./Condition";
import History from "./History";
import ContentTag from "./ContentTag";
import BloggerInfo from "./BloggerInfo";
import ContentFeature from "./ContentFeature";
import BloggerSet from "./BloggerSet";
import FanAnalysis from "./FanAnalysis";
import { reqXhsDict } from "@/api/resource";
import { useEffect } from "react";
import { useXhsResource } from "@/store/xhsResource";
import { message } from "antd";

function Filter() {
  const [selectedRecord, setSelectedRecord] = useState({});
  const { tableParams } = useXhsResource();
  const [dataSource, setDataSource] = useState({});

  const type = tableParams.type;

  useEffect(() => {
    reqXhsDict({ type }).then((res) => {
      const { success, msg, data } = res;
      if (success && data) {
        setDataSource(data);
      } else {
        message.error(msg || "筛选数据请求失败");
      }
    });
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.search}></div>
      <div className={styles.content}>
        <SearchType />
        <KolResource
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
        <History />
        <ContentTag
          dataSource={dataSource}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
        <BloggerInfo />
        <ContentFeature />
        <BloggerSet />
        <FanAnalysis />
        {/* 筛选条件 */}
        <Condition selectedRecord={selectedRecord} />
      </div>
    </div>
  );
}
export default Filter;
