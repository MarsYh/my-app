import React, { useState } from "react";
import styles from "./index.module.less";
import SearchType from "./SearchType";
import KolResource from "./KolResource";
import Conditions from "./Conditions";
import History from "./History";
import ContentTag from "./ContentTag";
import BloggerInfo from "./BloggerInfo";
import ContentFeature from "./ContentFeature";
import BloggerSet from "./BloggerSet";
import FanAnalysis from "./FanAnalysis";

function Filter() {
  const [selectedRecord, setSelectedRecord] = useState({});

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
        <ContentTag />
        <BloggerInfo />
        <ContentFeature />
        <BloggerSet />
        <FanAnalysis />
        {/* 筛选条件 */}
        <Conditions selectedRecord={selectedRecord} />
      </div>
    </div>
  );
}
export default Filter;
