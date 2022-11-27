import { Avatar, Modal, Popover, Tag } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { CloseOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons'
import IconOfficial from '../../img/icon-official.png'
import IconHead from '../../img/icon-headImg.jpg'
import classNames from 'classnames'
import IconBrand from '../../img/icon-brandImg.jpg'
import IconTitle from '../../img/icon-title.jpg'
import IconVideoBtn from '../../img/icon-videoBtn.png'
import IconTitleImg from '../../img/icon-titleBoxImg.svg'
import IconBefore from '../../img/icon-before.svg'
import IconAfter from '../../img/icon-after.svg'
import IconAnalyze from '../../img/icon-analyse.svg'
import { REDBOOK_LIST_CONFIG } from '../../../../sourceData'

function AnalyzeModal(props, ref) {
  const [hover, setHover] = useState()
  const [click, setClick] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsModalOpen(true)
      },
    }
  })
  return (
    <Modal
      closable={false}
      className={styles.analyzeModal}
      width={1200}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}>
      <div className={styles.modalBtnList}>
        <div
          className={classNames(
            styles.beforeBtn,
            click === 'before' && styles.beforeBtnShow
          )}
          onClick={() => setClick('before')}>
          <img src={IconBefore} alt="" />
          <div className={styles.beforeBtnContent}>上一个：暂无作品标题</div>
        </div>
        <div className={styles.afterBtn}>
          <img src={IconAfter} alt="" />
          <div className={styles.afterBtnContent}>下一个：红墙下的南风</div>
        </div>
        <div className={styles.analyzeBtn}>
          <img src={IconAnalyze} alt="" />
          <div className={styles.analyzeBtnContent}>查看分析报告</div>
        </div>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.closeBtn}>
          <CloseOutlined className={styles.closeIcon} />
        </div>
        <div className={styles.header}>
          <div>
            <div className={styles.titleInfo}>
              <div className={styles.titleBox}>
                <div className={styles.title}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.xiaohongshu.com/discovery/item/62f33eeb000000000900e5f0">
                    拥有这套丙烯马克笔后，我真的省大钱了👏
                  </a>
                </div>
              </div>
              <div className={styles.tags}>
                <div className={styles.officialTag}>
                  <img src={IconOfficial} alt="" />
                  官方报备
                </div>
                <div className={styles.tag}>兴趣爱好</div>
                <div className={styles.tag}>文具手帐</div>
              </div>
            </div>
            <div className={classNames(styles.titleInfo, styles.userInfo)}>
              <img src={IconHead} alt="" className={styles.pointer} />
              <span style={{ marginLeft: '6px' }}>大葱明说文具</span>
              <span style={{ marginLeft: '8px' }}>发布于</span>
              <span style={{ marginLeft: '4px' }}>2022-08-10 17:30:00</span>
              <span style={{ marginLeft: '24px' }}>数据更新</span>
              <span style={{ marginLeft: '4px' }}>2022-11-18 10:27:01</span>
              <span className={classNames(styles.pointer, styles.update)}>
                <SyncOutlined />
                更新
              </span>
            </div>
          </div>
          <div className={styles.brand}>
            <img src={IconBrand} alt="" />
            <div>
              <Popover content="STA斯塔">
                <div
                  className={classNames(styles.brandTitle, styles.pointer)}
                  onMouseEnter={() => setHover('sta')}
                  onMouseLeave={() => setHover()}>
                  <div className={styles.title}>STA斯塔</div>
                  {hover === 'sta' && (
                    <SearchOutlined className={styles.iconSearch} />
                  )}
                </div>
              </Popover>
              <div className={styles.coBrand}>合作品牌</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '12px' }}>
          <div className={styles.flexBetween}>
            <div>
              <div className={styles.videoBox}>
                <a
                  href="https://www.xiaohongshu.com/discovery/item/62f33eeb000000000900e5f0"
                  rel="noreferrer"
                  target="_blank">
                  <img src={IconTitle} alt="" className={styles.titleImg} />
                  <img src={IconVideoBtn} alt="" className={styles.videoBtn} />
                </a>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.layContent}>
                <div className={styles.titleContent}>
                  <div className={styles.title}>
                    <b>标题</b>
                    <img src={IconTitleImg} alt="" />
                  </div>
                  <div className={styles.count}>20字符</div>
                </div>
                <div>拥有这套丙烯马克笔后，我真的省大钱了👏</div>
              </div>
              <div className={styles.layContent}>
                <div className={styles.titleContent}>
                  <div className={styles.title}>
                    <b>正文</b>
                    <img src={IconTitleImg} alt="" />
                  </div>
                  <div className={styles.count}>195字符</div>
                </div>
                <div className={styles.textContent}>
                  原来丙烯马克笔还有这么牛的功能！
                  <br />
                  画画党们必须拥有！超强覆盖力让你知道啥叫后悔药！
                  <br />
                  大葱在拿到这套笔后自己画了手机壳，咕卡，我的帆布包包。感觉自己省大钱了，手机壳，玻璃杯，小挂件，只有你想不到的，没有他做不到的！
                  <br />
                  将家里的东西通通变废为宝～
                  <br />
                  #学生党[话题]# #文具安利[话题]# #文具[话题]#
                  #丙烯马克笔[话题]#
                  #斯塔马克笔[话题]##变废为宝[话题]##斯塔彩虹笔[话题]#
                </div>
              </div>
              <div className={styles.layContent}>
                <div className={styles.titleContent}>
                  <div className={styles.title}>
                    <b>话题</b>
                    <img src={IconTitleImg} alt="" />
                  </div>
                  <div className={styles.count}>28字符</div>
                </div>
                <div className={styles.topics}>
                  <span>#学生党</span>
                  <span>#文具安利</span>
                  <span>#文具</span>
                  <span>#丙烯马克笔</span>
                  <span>#斯塔马克笔</span>
                  <span>#变废为宝</span>
                  <span>#斯塔彩虹笔</span>
                </div>
              </div>
              <div className={styles.layContent}>
                <div className={styles.titleContent}>
                  <div className={styles.title}>
                    <b>视频时长</b>
                    <img src={IconTitleImg} alt="" />
                  </div>
                  <div className={styles.count}>55s</div>
                </div>
              </div>
              <div className={styles.layContent}>
                <div className={styles.titleContent}>
                  <div className={styles.title}>
                    <b>作品标签</b>
                    <img src={IconTitleImg} alt="" />
                  </div>
                </div>
                <div className={styles.tagBox}>
                  {REDBOOK_LIST_CONFIG.map((item) => (
                    <Tag key={item.value}>
                      <div
                        onMouseEnter={() => setHover(item.value)}
                        onMouseLeave={() => setHover()}
                        className={classNames(styles.tagTitle)}>
                        <div>{item.label}</div>
                        {hover === item.value && (
                          <SearchOutlined className={styles.iconSearch} />
                        )}
                      </div>
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(AnalyzeModal)
