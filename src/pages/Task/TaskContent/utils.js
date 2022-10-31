import { Badge } from 'antd'
import { CONFIG, SUBTASK_BADGE_CONFIG, TEXT } from "./sourceData"

// 渲染任务状态
export function renderTaskStatus (status) {
  const _status = CONFIG[status]
  return (
    <div>
      <Badge status={_status} />
      <span>{status || '-'}</span>
    </div>
  )
}


export function renderSubTaskStatus (subStatus) {
  const _subText = TEXT[subStatus]
  const _subBadgeStatus = SUBTASK_BADGE_CONFIG[subStatus]
  return (
    <div>
      <Badge status={_subBadgeStatus} />
      <span>{_subText || '-'}</span>
    </div>
  )
}