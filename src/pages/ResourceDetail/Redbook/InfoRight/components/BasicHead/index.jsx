// 达人头部基础信息
import React, { useEffect, useState } from 'react'
import { reqXhsBasic } from '@/api/resourceDetail'
import { useParams } from 'react-router-dom'
import { message, Spin, Button, Divider, Popover } from 'antd'
import styles from './index.module.less'
import IconGift from '@/assets/img/icon-gift.svg'
import IconShopCart from '@/assets/img/icon-shopcart.svg'
import IconFemale from '@/assets/img/icon-female.svg'
import IconMale from '@/assets/img/icon-male.svg'
import IconMCN from '@/assets/img/icon-mcn.svg'
import IconOperate from './img/in-cooperate.png'
import IconPugongying from './img/pugongying.png'
import IconPugongying_BG from './img/pugongying_bg.png'
import classNames from 'classnames'

const BasicHead = () => {
  const { id } = useParams()
  // console.log('id:', id)

  const [data, setData] = useState({})
  // console.log('data:', data)
  const [loading, setLoading] = useState(false)

  function renderContentTags(tags) {
    return tags?.map((tag) => {
      const { taxonomy1Tag, taxonomy2Tags } = tag
      return taxonomy2Tags?.length ? (
        <Popover
          placement="right"
          key={taxonomy1Tag}
          content={
            <div>
              {taxonomy2Tags?.map((child) => (
                <div key={child} className={styles.secTag}>
                  {child}
                </div>
              ))}
            </div>
          }>
          <div>{taxonomy1Tag}</div>
        </Popover>
      ) : (
        <div>{taxonomy1Tag}</div>
      )
    })
  }
  function renderPersonalTags(tag) {
    return !tag === null ? (
      <div className={classNames(styles.personalTags, styles.cursorHover)}>
        {tag}
      </div>
    ) : null
  }

  function inCooperate(tags) {
    // if (!Array.isArray(tags) && !tags?.length) return null
    return tags?.map((tag) =>
      tag.hover ? (
        <Popover
          key={tag.content}
          content={
            <>
              <div>{tag.hover}</div>
              <div className={styles.tagUser}>
                <span>打标人:</span>
                <img
                  className={styles.tagHeadImgUrl}
                  src={tag.tagHeadImgUrl}
                  alt=""
                />
                {tag.tagUser}
              </div>
              <div className={styles.tagTime}>
                <span>打标时间:</span>
                <span className={styles.tagTimeSize}>{tag.tagTime}</span>
              </div>
            </>
          }>
          <div>{tag.content}</div>
        </Popover>
      ) : (
        <div key={tag.content}>{tag.content}</div>
      )
    )
  }
  function handleClick() {
    // <Popover
    // content={
    //   <div className={styles.popover}>
    //     <div></div>
    //   </div>
    // }>
    //   <div>...</div>
    // </Popover>
  }
  useEffect(() => {
    const params = { userId: id, ageId: 12323 }
    setLoading(true)
    // console.log('params:', params)
    reqXhsBasic(params)
      .then((res) => {
        const { success, msg, data } = res
        // console.log(res)
        if (success && data) {
          setData(data)
          message.success('请求成功')
        } else {
          message.error(msg || '请求失败')
        }
      })
      .catch((error) => {
        console.log('error:')
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500)
      })
  }, [])

  return (
    <Spin spinning={loading}>
      <div className={styles.head}>
        <div className={styles.head_content}>
          <div className={styles.headLeft}>
            <div className={styles.infoBox}>
              <img src={data.headPhoto} alt="" />
              <div className={styles.sex}>
                {data.gender === '女' && (
                  <img className={styles.female} src={IconFemale} alt="" />
                )}
                {data.gender === '男' && (
                  <img className={styles.male} src={IconMale} alt="" />
                )}
              </div>
              <div className={styles.button}>
                <div className={styles.checkBtn}>
                  <Button>查看主页</Button>
                  <Button>更新数据</Button>
                </div>
                <Button>+ 添加</Button>
              </div>
            </div>
            <div className={styles.dataBox}>
              <div className={styles.baseInfo}>
                <span className={styles.name}>{data.name}</span>
                <span className={styles.level}>
                  <span>LV{data.currentLevel}</span>
                </span>
                <div className={styles.firstImg}>
                  <img className={styles.cursorHover} src={IconGift} alt="" />
                </div>
                <div>
                  <img
                    className={styles.cursorHover}
                    src={IconShopCart}
                    alt=""
                  />
                </div>
              </div>
              <div className={styles.tagInfo}>
                <div className={styles.cursorHover}>
                  {renderContentTags(data.contentTags)}
                </div>
                {renderPersonalTags(data.personal_tags)}
              </div>
              <div className={styles.locationInfo}>
                <span className={styles.idInfo}>
                  <span>小红书号</span>
                  <span>{data.redId}</span>
                </span>
                <Divider type="vertical" />
                <span>{data.location}</span>
                <Divider type="vertical" />
                <span className={styles.company}>
                  <img src={IconMCN} alt="" />
                  <span>大禹机构</span>
                </span>
                <Divider type="vertical" />
                <span>年框签约机构-新榜</span>
              </div>
              <div className={styles.introduction}>
                <span>简介</span>
                <span
                  title="各平台同名 🍑小店主 ✨美妆 | 护肤 | 生活
                爱凤小百科在线等你～📮shian 爱凤小百科在线等你，
                爱凤小百科在线等你～⭐️合作：xcz201901(直播) ...">
                  各平台同名 🍑小店主 ✨美妆 | 护肤 | 生活
                  爱凤小百科在线等你～📮shian 爱凤小百科在线等你，
                  爱凤小百科在线等你～⭐️合作：xcz201901(直播) ...
                </span>
              </div>
              <div className={styles.dataInfo}>
                <div className={styles.fansCount}>
                  <span>粉丝数</span>
                  <span>{(data.fansCount / 10000).toFixed(2)}w</span>
                </div>
                <div className={styles.likesCount}>
                  <span>赞藏数</span>
                  <span>{(data.likeCollectCountInfo / 10000).toFixed(2)}w</span>
                </div>
                <div className={styles.notesCount}>
                  <span>笔记数</span>
                  <span>{data.totalNoteCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.headRight}>
            <div className={styles.right_title}>
              <span>数据来源:</span>
              <img src={IconPugongying} alt="" />
              <span>蒲公英</span>
            </div>
            <div className={styles.bg}>
              <img src={IconPugongying_BG} alt="" />
            </div>
          </div>
        </div>
        <Divider dashed className={styles.divider} />
        <div className={styles.tagBox}>
          <img src={IconOperate} alt="" />
          <div className={styles.resourceTagRes}>
            {inCooperate(data.resourceTagRes)}
          </div>
          {/* {console.log('data::', data)} */}
          <div className={styles.dote} onClick={() => handleClick()}>
            ...
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default BasicHead
