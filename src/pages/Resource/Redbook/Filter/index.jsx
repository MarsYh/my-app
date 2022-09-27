// 小红书筛选组件
import React from 'react'
import styles from "./index.module.less"
import KolResource from './KolResource'
import SearchType from './SearchType'
import HistoryCoo from './HistoryCoo'
import Conditions from './Conditions'

const Filter = ()=>{

    const [ selectedList,setSelectedList ] = React.useState([])

    function onSetSelectedList(selected){
        const _selectedList = [...selectedList]
        _selectedList.push(selected)
        setSelectedList(_selectedList)
    }

    return (
        <div className={styles.container}>
            <div className={styles.search}></div>
            <div className={styles.content}>
                <SearchType />
                <KolResource onSetSelectedList={onSetSelectedList}/>
                <HistoryCoo />

                {/* 筛选条件 */}
                <Conditions selectedList={selectedList}/>
            </div>
        </div>
    )

}


export default Filter