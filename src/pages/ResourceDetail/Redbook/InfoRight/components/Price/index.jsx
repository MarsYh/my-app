import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { reqXhsPrice } from '@/api/resourceDetail'
import { useParams } from 'react-router-dom'
import { Input, Tooltip } from 'antd'
import IconOfficialPrice from '../../img/icon-official-price.svg'
import IconPrivatePrice from '../../img/icon-private-price.svg'
import { QuestionCircleOutlined } from '@ant-design/icons'
const { TextArea } = Input

function Price() {
  const { id } = useParams()
  const [data, setData] = useState({})
  useEffect(() => {
    const params = { userId: id }
    reqXhsPrice(params)
      .then((res) => {
        const { data } = res
        if (data) {
          setData(data)
        }
      })
      .catch((error) => {
        console.log('error:')
      })
  }, [])

  function renderLivePrice(data) {
    // console.log('price:', price)
    data.pcPrice === 0 ? (
      <div className={styles.number}>¥-</div>
    ) : (
      <div className={styles.number}>{data.pcPrice}</div>
    )
    data.zcPrice === 0 ? (
      <div className={styles.number}>¥-</div>
    ) : (
      <div className={styles.number}>{data.zcPrice}</div>
    )
  }
  return (
    <div className={styles.contentLeft}>
      <div className={styles.official_price}>
        <div>
          <img src={IconOfficialPrice} alt="" />
        </div>
        <div className={styles.picture_price}>
          <span className={styles.price}>图文笔记一口价</span>
          <span className={styles.number}>{`¥${data.picturePrice}`}</span>
        </div>
        <div className={styles.video_price}>
          <span className={styles.price}>视频笔记一口价</span>
          <span className={styles.number}>{`¥${data.videoPrice}`}</span>
        </div>
        <div className={styles.live_normal_price}>
          <span className={styles.price}>直播拼场报价</span>
          <span className={styles.number}>{renderLivePrice(data)}</span>
        </div>
        <div className={styles.live_special_price}>
          <span className={styles.price}>直播专场报价</span>
          <span className={styles.number}>{renderLivePrice(data)}</span>
        </div>
        <div className={styles.dataTime}>
          <div>数据更新时间：</div>
          <div>{data.updTime}</div>
        </div>
      </div>
      <div className={styles.private_price}>
        <div className={styles.privateHead}>
          <img src={IconPrivatePrice} alt="" />
          <Tooltip
            placement="bottom"
            title={
              <div>
                此处展示为最新报价，如想查看历史报价变化请到性价比表现查看
              </div>
            }>
            <div className={styles.note}>
              <QuestionCircleOutlined />
              <span>说明</span>
            </div>
          </Tooltip>
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
            style={{ maxWidth: '172px' }}
            autoSize
            placeholder="请填写其他类型的报价备注"
          />
        </div>
      </div>
    </div>
  )
}

export default Price
