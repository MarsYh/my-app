// 筛选项行布局
import React from 'react'
import styles from "./index.module.less"

const FilterRow = (props)=>{

    const { children,title } = props

    return (
        <div className={styles.box}>
            <div className={styles.title}>{title}</div>
            <div>
                {children}
            </div>
        </div>
    )

}


export default FilterRow
