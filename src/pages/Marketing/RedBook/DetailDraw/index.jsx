import { Divider, Popover, Table } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import IconTitle from './img/icon-title.jpg'
import IconBrand from './img/icon-brand.png'
import IconHead from './img/icon-headImg.jpg'
import IconMiddle from './img/icon-middle.svg'
import IconVideo from './img/icon-video.svg'
import IconLike from './img/icon-like.svg'
import classNames from 'classnames'

function DetailDraw() {
  const [hover, setHover] = useState('1')
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.infoBox}>
          <div
            onMouseEnter={() => setHover('1')}
            onMouseLeave={() => setHover()}
            className={classNames(
              styles.infoItem,
              hover === '1' && styles.hover
            )}>
            <div className={styles.imgBox}>
              <img src={IconTitle} alt="" className={styles.cover} />
              <Popover content="文具手帐">
                <span className={styles.interest}>兴趣爱好</span>
              </Popover>
              <div className={styles.brandBox}>
                <img src={IconBrand} alt="" />
                <Popover content="STA斯塔">
                  <span className={classNames(styles.ellipsis, styles.pointer)}>
                    STA斯塔
                  </span>
                </Popover>
              </div>
              <div className={styles.titleBox}>
                <span className={styles.titleInfo}>
                  <img src={IconVideo} alt="" />
                  <Popover content="拥有这套丙烯马克笔后，我真的省大钱了👏">
                    <span className={styles.ellipsis}>
                      拥有这套丙烯马克笔后，我真的省大钱了👏
                    </span>
                  </Popover>
                </span>
                <span
                  className={classNames(
                    styles.time,
                    hover === '1' && styles.timeHover
                  )}>
                  2022-08-10 17:30:00
                </span>
              </div>
              <div className={styles.mask}></div>
            </div>
            <div className={styles.personalBox}>
              <div className={styles.left}>
                <img src={IconHead} alt="" className={styles.pointer} />
                <p className={styles.title}>
                  <Popover content="大葱明说文具">
                    <span className={styles.pointer}>大葱明说文具</span>
                  </Popover>
                  <span>
                    <img src={IconMiddle} alt="" className={styles.middle} />
                    <span className={styles.pointer}>腰部达人</span>
                  </span>
                </p>
              </div>
              <div className={styles.dataBox}>
                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <img
                    src={IconLike}
                    alt=""
                    style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                </Popover>

                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <p className={classNames(styles.likeCount, styles.pointer)}>
                    72.67w
                  </p>
                </Popover>
              </div>
            </div>
          </div>
          <div
            onMouseEnter={() => setHover('2')}
            onMouseLeave={() => setHover()}
            className={classNames(
              styles.infoItem,
              hover === '2' && styles.hover
            )}>
            <div className={styles.imgBox}>
              <img src={IconTitle} alt="" className={styles.cover} />
              <Popover content="文具手帐">
                <span className={styles.interest}>兴趣爱好</span>
              </Popover>
              <div className={styles.brandBox}>
                <img src={IconBrand} alt="" />
                <span className={styles.ellipsis}>STA斯塔</span>
              </div>
              <div className={styles.titleBox}>
                <span className={styles.titleInfo}>
                  <img src={IconVideo} alt="" />
                  <Popover content="拥有这套丙烯马克笔后，我真的省大钱了👏">
                    <span className={styles.ellipsis}>
                      拥有这套丙烯马克笔后，我真的省大钱了👏
                    </span>
                  </Popover>
                </span>
                <span
                  className={classNames(
                    styles.time,
                    hover === '2' && styles.timeHover
                  )}>
                  2022-08-10 17:30:00
                </span>
              </div>
              <div className={styles.mask}></div>
            </div>
            <div className={styles.personalBox}>
              <div className={styles.left}>
                <img src={IconHead} alt="" className={styles.pointer} />
                <p className={styles.title}>
                  <Popover content="大葱明说文具">
                    <span className={styles.pointer}>大葱明说文具</span>
                  </Popover>
                  <span>
                    <img src={IconMiddle} alt="" className={styles.middle} />
                    <span className={styles.pointer}>腰部达人</span>
                  </span>
                </p>
              </div>
              <div className={styles.dataBox}>
                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <img
                    src={IconLike}
                    alt=""
                    style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                </Popover>

                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <p className={classNames(styles.likeCount, styles.pointer)}>
                    72.67w
                  </p>
                </Popover>
              </div>
            </div>
          </div>
          <div
            onMouseEnter={() => setHover('3')}
            onMouseLeave={() => setHover()}
            className={classNames(
              styles.infoItem,
              hover === '3' && styles.hover
            )}>
            <div className={styles.imgBox}>
              <img src={IconTitle} alt="" className={styles.cover} />
              <Popover content="文具手帐">
                <span className={styles.interest}>兴趣爱好</span>
              </Popover>
              <div className={styles.brandBox}>
                <img src={IconBrand} alt="" />
                <span className={styles.ellipsis}>STA斯塔</span>
              </div>
              <div className={styles.titleBox}>
                <span className={styles.titleInfo}>
                  <img src={IconVideo} alt="" />
                  <Popover content="拥有这套丙烯马克笔后，我真的省大钱了👏">
                    <span className={styles.ellipsis}>
                      拥有这套丙烯马克笔后，我真的省大钱了👏
                    </span>
                  </Popover>
                </span>
                <span
                  className={classNames(
                    styles.time,
                    hover === '3' && styles.timeHover
                  )}>
                  2022-08-10 17:30:00
                </span>
              </div>
              <div className={styles.mask}></div>
            </div>
            <div className={styles.personalBox}>
              <div className={styles.left}>
                <img src={IconHead} alt="" className={styles.pointer} />
                <p className={styles.title}>
                  <Popover content="大葱明说文具">
                    <span className={styles.pointer}>大葱明说文具</span>
                  </Popover>
                  <span>
                    <img src={IconMiddle} alt="" className={styles.middle} />
                    <span className={styles.pointer}>腰部达人</span>
                  </span>
                </p>
              </div>
              <div className={styles.dataBox}>
                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <img
                    src={IconLike}
                    alt=""
                    style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                </Popover>

                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <p className={classNames(styles.likeCount, styles.pointer)}>
                    72.67w
                  </p>
                </Popover>
              </div>
            </div>
          </div>
          <div
            onMouseEnter={() => setHover('4')}
            onMouseLeave={() => setHover()}
            className={classNames(
              styles.infoItem,
              hover === '4' && styles.hover
            )}>
            <div className={styles.imgBox}>
              <img src={IconTitle} alt="" className={styles.cover} />
              <Popover content="文具手帐">
                <span className={styles.interest}>兴趣爱好</span>
              </Popover>
              <div className={styles.brandBox}>
                <img src={IconBrand} alt="" />
                <span className={styles.ellipsis}>STA斯塔</span>
              </div>
              <div className={styles.titleBox}>
                <span className={styles.titleInfo}>
                  <img src={IconVideo} alt="" />
                  <Popover content="拥有这套丙烯马克笔后，我真的省大钱了👏">
                    <span className={styles.ellipsis}>
                      拥有这套丙烯马克笔后，我真的省大钱了👏
                    </span>
                  </Popover>
                </span>
                <span
                  className={classNames(
                    styles.time,
                    hover === '4' && styles.timeHover
                  )}>
                  2022-08-10 17:30:00
                </span>
              </div>
              <div className={styles.mask}></div>
            </div>
            <div className={styles.personalBox}>
              <div className={styles.left}>
                <img src={IconHead} alt="" className={styles.pointer} />
                <p className={styles.title}>
                  <Popover content="大葱明说文具">
                    <span className={styles.pointer}>大葱明说文具</span>
                  </Popover>
                  <span>
                    <img src={IconMiddle} alt="" className={styles.middle} />
                    <span className={styles.pointer}>腰部达人</span>
                  </span>
                </p>
              </div>
              <div className={styles.dataBox}>
                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <img
                    src={IconLike}
                    alt=""
                    style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                </Popover>

                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <p className={classNames(styles.likeCount, styles.pointer)}>
                    72.67w
                  </p>
                </Popover>
              </div>
            </div>
          </div>
          <div
            onMouseEnter={() => setHover('5')}
            onMouseLeave={() => setHover()}
            className={classNames(
              styles.infoItem,
              hover === '5' && styles.hover
            )}>
            <div className={styles.imgBox}>
              <img src={IconTitle} alt="" className={styles.cover} />
              <Popover content="文具手帐">
                <span className={styles.interest}>兴趣爱好</span>
              </Popover>
              <div className={styles.brandBox}>
                <img src={IconBrand} alt="" />
                <span className={styles.ellipsis}>STA斯塔</span>
              </div>
              <div className={styles.titleBox}>
                <span className={styles.titleInfo}>
                  <img src={IconVideo} alt="" />
                  <Popover content="拥有这套丙烯马克笔后，我真的省大钱了👏">
                    <span className={styles.ellipsis}>
                      拥有这套丙烯马克笔后，我真的省大钱了👏
                    </span>
                  </Popover>
                </span>
                <span
                  className={classNames(
                    styles.time,
                    hover === '5' && styles.timeHover
                  )}>
                  2022-08-10 17:30:00
                </span>
              </div>
              <div className={styles.mask}></div>
            </div>
            <div className={styles.personalBox}>
              <div className={styles.left}>
                <img src={IconHead} alt="" className={styles.pointer} />
                <p className={styles.title}>
                  <Popover content="大葱明说文具">
                    <span className={styles.pointer}>大葱明说文具</span>
                  </Popover>
                  <span>
                    <img src={IconMiddle} alt="" className={styles.middle} />
                    <span className={styles.pointer}>腰部达人</span>
                  </span>
                </p>
              </div>
              <div className={styles.dataBox}>
                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <img
                    src={IconLike}
                    alt=""
                    style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                </Popover>

                <Popover
                  overlayClassName={styles.popover}
                  placement="right"
                  content={
                    <>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>阅读量</span>
                        <span>565.53w</span>
                      </div>
                      <Divider dashed={true} />
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>点赞量</span>
                        <span>72.67w</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>评论量</span>
                        <span>2889</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>分享量</span>
                        <span>2845</span>
                      </div>
                      <div className={styles.popoverContent}>
                        <img src={IconLike} alt="" />
                        <span>收藏量</span>
                        <span>37.96w</span>
                      </div>
                    </>
                  }>
                  <p className={classNames(styles.likeCount, styles.pointer)}>
                    72.67w
                  </p>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailDraw
