import IconTiktok from './SearchContent/img/icon-official-tiktok-gray.svg'
import IconRedbook from './SearchContent/img/icon-official-xiaohongshu.svg'
import IconWeibo from './SearchContent/img/icon-official-weibo-gray.svg'
import IconWechat from './SearchContent/img/icon-official-wechat-gray.svg'
import IconContent from './SearchContent/img/icon-content.svg'
import IconBrand from './SearchContent/img/icon-brand.svg'
import IconBigImg from './RedBook/List/img/icon-big-img.svg'
import IconList from './RedBook//List/img/icon-list.svg'
import IconHeadKol from "./RedBook/List/img/icon-middle.svg"
import IconPerson from "./RedBook/List/img/icon-person.svg"
import IconStar from "./RedBook/List/img/icon-star.svg"

import RedBook from "./RedBook"

export const SEARCH_CONTENT_HEAD_CONFIG = [
  { label: '抖音', icon: IconTiktok, key: 'tiktok', disabled: true, },
  { label: '小红书', icon: IconRedbook, key: 'redbook', children: <RedBook /> },
  { label: '微博', icon: IconWeibo, key: 'weibo', disabled: true, },
  { label: '微信', icon: IconWechat, key: 'wechat', disabled: true, },
]
export const SEARCH_CONTENT_CONFIG = [
  { label: '作品内容', icon: IconContent, value: '1' },
  { label: '品牌', icon: IconBrand, value: '2' },
]
export const REDBOOK_LIST_CONFIG = [
  { label: '马克笔', value: '1' },
  { label: '文具', value: '2' },
  { label: '绘画', value: '3' },
  { label: '丙烯马克笔', value: '4' },
]
export const REDBOOK_TYPE_CONFIG = [
  { label: '大图模式', value: 'big', icon: IconBigImg },
  { label: '列表模式', value: 'list', icon: IconList },
]
export const USER_ATTRIBUTE_TEXT_CONFIG = {
  1: '明星',
  4: '头部kol',
  5: '腰部达人',
  6: '初级达人',
  7: '素人',
}
export const USER_ATTRIBUTE_PIC_CONFIG = {
  1: IconStar,
  4: IconHeadKol,
  5: IconHeadKol,
  6: IconHeadKol,
  7: IconPerson,
}
export const SIMILAR_TABS_CONFIG = [
  { label: '偏封面相似', value: '1' },
  { label: '偏答案/文字相似', value: '2' },
  { label: '偏受众相似', value: '3' },
]