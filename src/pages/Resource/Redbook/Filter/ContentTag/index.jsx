// 内容标签
import React from "react";
import { Checkbox, Popover, Tag } from "antd";
import styles from "./index.module.less";
import FilterRow from "../../../components/FilterRow";
import { CONTENT_TAG_CONFIG } from "./sourceData";
import { useXhsResource } from "@/store/xhsResource";
import { useState } from "react";

function ContentTag() {
  const { CheckableTag } = Tag;
  const { tableParams, dispatch } = useXhsResource();
  const [contentTags, setContentTags] = useState([]);

  function onFirstTagChange(item, checked) {

    const _contentTags = [...contentTags];
    // 被选中
    if (checked) {
      const _children = item.children?.map((child) => child.value);
      const o = { level1: item.label, level2: _children };
      _contentTags.push(o)
    } else {
      // 取消
      const idx = _contentTags.findIndex(o => o.level1 === item.label);
      _contentTags.splice(idx, 1);
    }
    setContentTags(_contentTags);
  }

  function onSecondTagChange(checkedList) {
    const o = { ...tableParams };
    if (checkedList.length) {
      o.contentTags = { level1: "美妆个护", level2: checkedList };
    } else {
      delete o.contentTags;
    }
    dispatch(o);
  }

  // 获取被选中的子项
  function getCheckedList(item){
    return contentTags.find(o=>o.level1 === item.label)?.level2
  }

  return (
    <FilterRow title="内容标签">
      {CONTENT_TAG_CONFIG.map((item) => (
        <Popover
          overlayClassName={styles.popoverPro}
          key={item.value}
          placement="bottom"
          content={
            <Checkbox.Group
              onChange={(checkedList) => onSecondTagChange(item, checkedList)}
              value={getCheckedList(item)}
            >
              {item.children?.map((child) => (
                <Checkbox key={child.value} value={child.value}>
                  {child.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          }
        >
          <CheckableTag
            checked={contentTags.some(tag => item.label === tag.level1)}
            className={styles.tag}
            onChange={(checked) => onFirstTagChange(item, checked)}
          >
            {item.label}
          </CheckableTag>
        </Popover>
      ))}
    </FilterRow>
  );
}
export default ContentTag;
