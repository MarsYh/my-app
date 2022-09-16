import React, { useContext } from 'react'
import { Button, Divider, Input } from 'antd'
import styles from './index.module.less'
import IconHead from './img/head-photo.jpg'
import IconGift from '@/assets/img/icon-gift.svg'
import IconShopCart from '@/assets/img/icon-shopcart.svg'
import IconSexual from '@/assets/img/icon-female.svg'
import IconMCN from '@/assets/img/icon-mcn.svg'
import IconOperate from './img/in-cooperate.png'
import IconPugongying from './img/pugongying.png'
import IconPugongying_BG from './img/pugongying_bg.png'
import IconOfficialPrice from './img/icon-official-price.svg'
import IconPrivatePrice from './img/icon-private-price.svg'
import { QuestionCircleOutlined } from '@ant-design/icons'
import context from '../context'
import SprPerfor from './components/SprPerfor'
import PriPerfor from './components/PriPerfor'

const { TextArea } = Input
const InfoRight = () => {
  // ?
  const { checked } = useContext(context)
  // console.log(checked)
  return (
    <div className={styles.infoRight}>
      <div className={styles.head}>
        <div className={styles.head_content}>
          <div className={styles.headLeft}>
            <div className={styles.infoBox}>
              <img src={IconHead} alt="" />
              <img className={styles.sex} src={IconSexual} alt="" />
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
                <span className={styles.name}>赵露思</span>
                <span className={styles.level}>
                  <span>LV3</span>
                </span>
                <div className={styles.firstImg}>
                  <img src={IconGift} alt="" />
                </div>
                <div>
                  <img src={IconShopCart} alt="" />
                </div>
              </div>
              <div className={styles.tagInfo}>
                <div className={styles.cursorHover}>美妆-护肤教程</div>
                <div className={styles.cursorHover}>颜值</div>
                <div className={styles.cursorHover}>美少女</div>
              </div>
              <div className={styles.locationInfo}>
                <span className={styles.idInfo}>
                  <span>小红书号</span>
                  <span>125844661455</span>
                </span>
                <Divider type="vertical" />
                <span>四川成都</span>
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
                  <span>50.4w</span>
                </div>
                <div className={styles.likesCount}>
                  <span>赞藏数</span>
                  <span>173.72w</span>
                </div>
                <div className={styles.notesCount}>
                  <span>笔记数</span>
                  <span>350</span>
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
          <div className={styles.cursorHover}>内部资源</div>
          <div className={styles.cursorHover}>历史合作</div>
          <div className={styles.cursorHover}>年框签约</div>
          <div className={styles.cursorHover}>合作品牌数·10个</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.official_price}>
            <div>
              <img src={IconOfficialPrice} alt="" />
            </div>
            <div className={styles.picture_price}>
              <span className={styles.price}>图文笔记一口价</span>
              <span className={styles.number}>¥17000</span>
            </div>
            <div className={styles.video_price}>
              <span className={styles.price}>视频笔记一口价</span>
              <span className={styles.number}>¥27000</span>
            </div>
            <div className={styles.live_normal_price}>
              <span className={styles.price}>直播拼场报价</span>
              <span className={styles.number}>¥37000</span>
            </div>
            <div className={styles.live_special_price}>
              <span className={styles.price}>直播专场报价</span>
              <span className={styles.number}>¥37000</span>
            </div>
            <div className={styles.dataTime}>
              <div>数据更新时间：</div>
              <div>2022/09/16 12:00:00</div>
            </div>
          </div>
          <div className={styles.private_price}>
            <div className={styles.privateHead}>
              <img src={IconPrivatePrice} alt="" />
              <div className={styles.note}>
                <QuestionCircleOutlined />
                <span>说明</span>
              </div>
            </div>
            <div className={styles.picture_price_input}>
              <div>图文笔记一口价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.video_price_input}>
              <div>视频笔记一口价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.live_normal_price_input}>
              <div>直播拼场报价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.live_special_price_input}>
              <div>直播专场报价</div>
              <Input placeholder="请填写实际报价" />
            </div>
            <div className={styles.note_input}>
              <div>报价备注</div>
              <TextArea
                rows={4}
                placeholder="请填写其他类型的报价
备注"
                maxLength={6}
              />
            </div>
          </div>
        </div>
        <div className={styles.contentRight}>
          {checked === 'spread_performance' && <SprPerfor />}
          {checked === 'price_performance' && <PriPerfor />}
        </div>
      </div>
    </div>
  )
}

export default InfoRight
