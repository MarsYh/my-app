// 博主信息
import React, { useState,useRef } from "react";
import styles from "./index.module.less";
import FilterSelected from "../../../components/FilterSelected";
import FilterRow from "../../../components/FilterRow";
import FilterRadio from "../../../components/FilterRadio";
import FilterCheckbox from "../../../components/FilterCheckbox";
import { useXhsResource } from "@/store/xhsResource";
import { useDebounceFn, useUpdateEffect } from "ahooks"
import { isEqual } from "lodash-es"

function BloggerInfo(props) {
  const tableParamsRef = useRef(null)
  const { dataSource, selectedRecord, setSelectedRecord } = props;
  const { tableParams, dispatch } = useXhsResource();
  const [slotFansValue, setSlotFansValue] = useState({});
  const [locationValues,setLocationValues] = useState([])

  function delFansNum() {
    const o = { ...tableParams };
    const _record = { ...selectedRecord };
    delete _record.fansNum;
    delete o.fansNum;

    if (slotFansValue.min || slotFansValue.max) {
      setSlotFansValue({});
    }

    dispatch(o);
    setSelectedRecord(_record);
  }

  function onFansChange(value) {
    const o = { ...tableParams };
    o.fansNum = value;

    const _record = { ...selectedRecord };
    const { desc, min, max } = value;

    _record.fansNum = (
      <FilterSelected onDel={delFansNum}>
        <div>粉丝数量:{desc ? desc : `${min}-${max}`}</div>
      </FilterSelected>
    );

    dispatch(o);
    setSelectedRecord(_record);
  }

  function onInputFansChange(key, value) {
    const _slotValue = { ...slotFansValue };
    _slotValue[key] = value;
    setSlotFansValue(_slotValue);
  }
  
  tableParamsRef.current = tableParams


  useUpdateEffect(() => {
    if(isEqual(locationValues,tableParams.location)){
      return
    }
    setLocationValues(tableParams.location || [])
  },[tableParams.location])

  function delLocation(item){
    const o = {...tableParamsRef.current}
    const record = { ...selectedRecord }
    o.location = o.location.filter(str => str !== item);
    if(!o.location.length){
      delete o.location
      delete record.location
    }else{
      record.location = o.location.map(str => (
        <FilterSelected key={str} onDel={()=>delLocation(str)}>
          <div>所在地域:{str}</div>
        </FilterSelected>
      ))
    }
    dispatch(o)
    setSelectedRecord(record)
  }

  const { run } = useDebounceFn((values)=>{
    const o = {...tableParams}
    const record = { ...selectedRecord }
    if(values.length){
      o.location = values
      record.location = values.map(str => (
        <FilterSelected key={str} onDel={()=>delLocation(str)}>
          <div>所在地域:{str}</div>
        </FilterSelected>
      ))
    }else{
      delete o.location
      delete record.location
    }

    dispatch(o)
    setSelectedRecord(record)
  },{
    wait:500
  })

  // 多选回调
  function onLocationChange(values){
    setLocationValues(values)
    run(values)
  }

  const fansSlotBtnDisabled =
    slotFansValue.min === undefined || slotFansValue.max === undefined;

  return (
    <FilterRow title="博主信息">
      <div className={styles.content}>
        <FilterRadio
          title="粉丝数量"
          isSlot
          checked={tableParams.fansNum}
          options={dataSource.fansNum || []}
          onChange={onFansChange}
          minProps={{
            placeholder: "0",
            value: slotFansValue.min,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("min", value),
          }}
          maxProps={{
            placeholder: "5000000",
            value: slotFansValue.max,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("max", value),
          }}
          slotOkBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          slotResetBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          onReset={delFansNum}
          onOk={() => onFansChange(slotFansValue)}
        />
        <FilterRadio
          title="博主性别"
          checked={tableParams.fansNum}
          options={dataSource.gender || []}
          onChange={onFansChange}
        />
        <FilterCheckbox
          title="所在地域"
          options={dataSource.location || []}
          checked={locationValues}
          onChange={onLocationChange}
        />
        <FilterRadio
          title="博主等级"
          isSlot
          location={dataSource.location}
          checked={tableParams.fansNum}
          options={dataSource.fansNum || []}
          onChange={onFansChange}
          minProps={{
            placeholder: "0",
            value: slotFansValue.min,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("min", value),
          }}
          maxProps={{
            placeholder: "5000000",
            value: slotFansValue.max,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("max", value),
          }}
          slotOkBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          slotResetBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          onReset={delFansNum}
          onOk={() => onFansChange(slotFansValue)}
        />
        <FilterRadio
          title="笔记类型"
          isSlot
          location={dataSource.location}
          checked={tableParams.fansNum}
          options={dataSource.fansNum || []}
          onChange={onFansChange}
          minProps={{
            placeholder: "0",
            value: slotFansValue.min,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("min", value),
          }}
          maxProps={{
            placeholder: "5000000",
            value: slotFansValue.max,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("max", value),
          }}
          slotOkBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          slotResetBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          onReset={delFansNum}
          onOk={() => onFansChange(slotFansValue)}
        />
        <FilterRadio
          title="IP归属地"
          isSlot
          location={dataSource.location}
          checked={tableParams.fansNum}
          options={dataSource.fansNum || []}
          onChange={onFansChange}
          minProps={{
            placeholder: "0",
            value: slotFansValue.min,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("min", value),
          }}
          maxProps={{
            placeholder: "5000000",
            value: slotFansValue.max,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("max", value),
          }}
          slotOkBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          slotResetBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          onReset={delFansNum}
          onOk={() => onFansChange(slotFansValue)}
        />
        <FilterRadio
          title="达人属性"
          isSlot
          location={dataSource.location}
          checked={tableParams.fansNum}
          options={dataSource.fansNum || []}
          onChange={onFansChange}
          minProps={{
            placeholder: "0",
            value: slotFansValue.min,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("min", value),
          }}
          maxProps={{
            placeholder: "5000000",
            value: slotFansValue.max,
            min: "0",
            max: "5000000",
            onChange: (value) => onInputFansChange("max", value),
          }}
          slotOkBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          slotResetBtnProps={{
            disabled: fansSlotBtnDisabled,
          }}
          onReset={delFansNum}
          onOk={() => onFansChange(slotFansValue)}
        />
      </div>
    </FilterRow>
  );
}
export default BloggerInfo;
