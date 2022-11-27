import IconContentFeature from "./img/icon-content-feature.svg"
import IconKolFeature from "./img/icon-kol-feature.svg"
import IconPerformance from "./img/icon-performance.svg"
import IconBrand from "./img/icon-brand.webp"
import ContentFeature from "./AdvancedFilter/components/ContentFeature"

export const PUBLIC_TIME_CONFIG = [
  { label: '近3天', value: '1' },
  { label: '近7天', value: '2' },
  { label: '近15天', value: '3' },
  { label: '近30天', value: '4' },
  { label: '近60天', value: '5' },
  { label: '近90天', value: '6' },
  { label: '自定义', value: '7' },
]
export const ADVANCED_FILTER_CONFIG = [
  { label: '内容特征', value: '1', icon: IconContentFeature, children: <ContentFeature /> },
  { label: '达人特征', value: '2', icon: IconKolFeature },
  { label: '传播表现', value: '3', icon: IconPerformance },
]
export const SORT_CONFIG = [
  { label: '阅读最多', value: '1' },
  { label: '互动最多', value: '2' },
  { label: '点赞最多', value: '3' },
  { label: '评论最多', value: '4' },
  { label: '分享最多', value: '5' },
  { label: '收藏最多', value: '6' },
  { label: '最新发布', value: '7' },
]
export const LAUNCH_INDUSTRY_CONFIG = [
  { label: '3C及电器', value: '1' },
  { label: '食品饮料', value: '2' },
  { label: '服装配饰', value: '3' },
  { label: '医疗保健', value: '4' },
  { label: '生活服务', value: '5' },
  { label: '房地产', value: '6' },
  { label: '家居建材', value: '7' },
  { label: '教育培训', value: '8' },
  { label: '出行旅游', value: '9' },
  { label: '社会公共', value: '101' },
  { label: '社会公共', value: '102' },
  { label: '社会公共', value: '103' },
  { label: '社会公共', value: '104' },
  { label: '社会公共', value: '105' },
  { label: '社会公共', value: '106' },
  { label: '社会公共', value: '107' },
  { label: '社会公共', value: '108' },
  { label: '社会公共', value: '109' },
  { label: '游戏', value: '11' },
]
export const LAUNCH_INDUSTRY_ITEM_CONFIG = [
  { label: '3C及电器', value: '1', icon: IconBrand },
  { label: '食品饮料', value: '2', icon: IconBrand },
  { label: '服装配饰', value: '3', icon: IconBrand },
  { label: '医疗保健', value: '4', icon: IconBrand },
  { label: '生活服务', value: '5', icon: IconBrand },
  { label: '房地产', value: '6', icon: IconBrand },
  { label: '家居建材', value: '7', icon: IconBrand },
  { label: '教育培训', value: '8', icon: IconBrand },
  { label: '出行旅游', value: '9', icon: IconBrand },
  { label: '社会公共', value: '101', icon: IconBrand },
  { label: '社会公共', value: '102', icon: IconBrand },
  { label: '社会公共', value: '103', icon: IconBrand },
  { label: '社会公共', value: '104', icon: IconBrand },
  { label: '社会公共', value: '105', icon: IconBrand },
  { label: '社会公共', value: '106', icon: IconBrand },
  { label: '社会公共', value: '107', icon: IconBrand },
  { label: '社会公共', value: '108', icon: IconBrand },
  { label: '社会公共', value: '109', icon: IconBrand },
  { label: '游戏', value: '11', icon: IconBrand },
]
export const CONTENT_FEATURE_CONFIG = [
  { label: '美妆', value: '1' },
  { label: '美妆个护', value: '2' },
  { label: '鞋包潮玩', value: '3' },
  { label: '穿搭打扮', value: '4' },
  { label: '美食', value: '5' },
  { label: '母婴育儿', value: '6' },
  { label: '旅游出行', value: '7' },
  { label: '家居家装', value: '8' },
  { label: '教育', value: '9' },
  { label: '生活', value: '101' },
  { label: '运动健身', value: '102' },
  { label: '兴趣爱好', value: '103' },
  { label: '影视综', value: '104' },
  { label: '婚嫁', value: '105' },
  { label: '摄影摄像', value: '106' },
  { label: '萌宠', value: '107' },
  { label: '情感星座', value: '108' },
  { label: '科技互联网', value: '109' },
  { label: '资讯', value: '11' },
  { label: '健康养生', value: '112' },
  { label: '科学科普', value: '113' },
  { label: '职场', value: '114' },
  { label: '交通工具', value: '115' },
  { label: '其他', value: '1154' },
]
export const CONTENT_FEATURE_ITEM_CONFIG = [
  { label: '彩妆', value: '1' },
  { label: '护肤', value: '2' },
  { label: '美妆合集', value: '3' },
  { label: '美妆其他', value: '4' },
]
export const COMMENT_COMPONENTS_CONFIG = [
  { label: '搜索组件', value: '1' },
  { label: '商品组件', value: '2' },
  { label: '店铺组件', value: '3' },
]
export const CONTENT_FEATURE_LIST_CONFIG = [
  { label: '内容形式', value: '1' },
  { label: '生活方式', value: '2' },
  { label: '内容风格', value: '3' },
  { label: '肤质肤色', value: '4' },
  { label: '皮肤护养', value: '5' },
]
export const KOL_TYPE_CONFIG = [
  { label: '普通账号', value: '1' },
  { label: '明星', value: '2' },
  { label: '品牌号', value: '3' },
  { label: '企业/机构号', value: '4' },
  { label: '头部kol', value: '5' },
  { label: '腰部达人', value: '6' },
  { label: '初级达人', value: '7' },
  { label: '素人', value: '8' },
]

export const FANS_NUM_CONFIG = [
  { label: '<10w', value: '1' },
  { label: '10w-100w', value: '2' },
  { label: '100w-300w', value: '3' },
  { label: '300w-500w', value: '4' },
  { label: '500w-1000w', value: '5' },
  { label: '>1000w', value: '6' },
]
export const AREA_CONFIG = [
  { label: '北京', value: '1' },
  { label: '上海', value: '2' },
  { label: '广州', value: '3' },
  { label: '深圳', value: '4' },
  { label: '杭州', value: '5' },
  { label: '成都', value: '6' },
  { label: '重庆', value: '7' },
  { label: '南京', value: '8' },
  { label: '宁波', value: '9' },
  { label: '苏州', value: '101' },
  { label: '长沙', value: '102' },
  { label: '西安', value: '103' },
  { label: '青岛', value: '104' },
  { label: '武汉', value: '105' },
  { label: '天津', value: '106' },
  { label: '大连', value: '107' },
  { label: '郑州', value: '108' },
  { label: '沈阳', value: '109' },
  { label: '东莞', value: '11' },
]
export const AGE_PERCENT_CONFIG = [
  { label: '<18占比高', value: '1' },
  { label: '18-24占比高', value: '2' },
  { label: '25-34占比高', value: '3' },
  { label: '35-44占比高', value: '4' },
  { label: '>44占比高', value: '5' },
]
export const CITY_PERCENT_CONFIG = [
  { label: '一线城市居多', value: '1' },
  { label: '新一线城市居多', value: '2' },
  { label: '二线城市居多', value: '3' },
  { label: '三线城市居多', value: '4' },
  { label: '四线城市居多', value: '5' },
  { label: '五线城市居多', value: '6' },
]
export const KOL_PRICE_CONFIG = [
  { label: '0.1万以下', value: '1' },
  { label: '0.1万-0.5万', value: '2' },
  { label: '0.5万-1万', value: '3' },
  { label: '1万-5万', value: '4' },
  { label: '5万及其以上', value: '5' },
]
export const CPM_CONFIG = [
  { label: '10以下', value: '1' },
  { label: '20以下', value: '2' },
  { label: '30以下', value: '3' },
  { label: '50以下', value: '4' },
  { label: '100以下', value: '5' },
  { label: '100以上', value: '6' },
]
export const CPE_CONFIG = [
  { label: '0.5以下', value: '1' },
  { label: '1以下', value: '2' },
  { label: '2以下', value: '3' },
  { label: '3以下', value: '4' },
  { label: '5以下', value: '5' },
  { label: '8以下', value: '6' },
  { label: '10以下', value: '7' },
  { label: '10以上', value: '8' },
]
export const READ_MEDIA_CONFIG = [
  { label: '10w以下', value: '1' },
  { label: '10w-50w', value: '2' },
  { label: '50w-100w', value: '3' },
  { label: '100w-200w', value: '4' },
  { label: '200w-300w', value: '5' },
  { label: '300w以上', value: '6' },
]
export const INTERACT_MEDIA_CONFIG = [
  { label: '10w以下', value: '1' },
  { label: '10w-50w', value: '2' },
  { label: '50w-100w', value: '3' },
  { label: '100w-200w', value: '4' },
  { label: '200w-300w', value: '5' },
  { label: '300w以上', value: '6' },
]
export const INTERACT_RATE_CONFIG = [
  { label: '1%以上', value: '1' },
  { label: '2%以上', value: '2' },
  { label: '3%以上', value: '3' },
  { label: '4%以上', value: '4' },
  { label: '5%以上', value: '5' },
]
export const VIDEO_RATE_CONFIG = [
  { label: '5%以上', value: '1' },
  { label: '10%以上', value: '2' },
  { label: '15%以上', value: '3' },
  { label: '20%以上', value: '4' },
  { label: '25%以上', value: '5' },
]
