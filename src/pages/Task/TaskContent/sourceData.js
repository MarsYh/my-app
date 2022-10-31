import IconAll from "./img/icon-all.svg"
import IconTiktok from "./img/icon-tiktok.svg"
import IconRedBook from "./img/icon-xhs.svg"
import IconWeibo from "./img/icon-weibo.svg"
import IconWechat from "./img/icon-wechat.svg"
import IconBilibili from "./img/icon-bilibili.svg"
import IconPGY from "./img/icon-pgy.svg"
import IconXt from './img/icon-xingtu.svg'

export const PLATFORM_NUM_CONFIG = {
  "全部": IconAll,
  "抖音": IconTiktok,
  "小红书": IconRedBook,
  "微博": IconWeibo,
  "微信": IconWechat,
  "B站": IconBilibili,
}
export const PLATFORM_CODE_CONFIG = {
  "全部": 0,
  "抖音": 1,
  "小红书": 2,
  "微博": 3,
  "微信": 4,
  "B站": 5,
}

export const DATA_TYPE_CONFIG = [
  {
    label: "达人数据",
    value: "达人数据",
  },
  {
    label: "投放数据",
    value: "投放数据",
  },
]
export const TASK_CODE_CONFIG = {
  1: '数据导出',
  2: '数据导出',
  3: '数据导出',
  4: '数据导出',
  5: '达人收录',
  6: '数据更新',
  7: '数据更新',
  8: '达人打标',
  9: '私有数据上传',
  10: '达人打标',
  15: '批量相似账号导出-不限'
}
export const TASK_TYPE_CONFIG = {
  1: '导出达人数',
  2: '导出达人数',
  3: '导出达人数',
  4: '导出达人数',
  5: '收录达人数',
  6: '更新达人数',
  7: '更新达人数',
  8: '打标达人数',
  9: '上传达人数',
  10: '打标达人数',
  15: '相似达人数'
}
export const SUBTASK_NUM_CONFIG = [
  {
    lable: '查看所有',
    value: 0
  },
  {
    lable: '仅看成功',
    value: 3
  },
  {
    lable: '仅看失败',
    value: 4
  },
]

export const CONFIG = {
  执行成功: "success",
  执行失败: "error",
  无法执行: "default",
}

export const SUBTASK_BADGE_CONFIG = {
  3: 'success',
  4: 'error',
}
export const TEXT = {
  3: '执行成功',
  4: '执行失败',
}

export const PLATFORM_IMGTYPE_CONFIG = {
  "小红书": IconPGY,
  "抖音": IconXt
}
export const PLATFORM_TEXTTYPE_CONFIG = {
  "小红书": "蒲公英达人",
  "抖音": "星图达人"
}