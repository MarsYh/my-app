import { Badge } from 'antd'

// 渲染任务状态
export function renderTaskStatus(record) {
    const { taskStatus } = record;
    const CONFIG = {
      执行成功: "success",
      执行失败: "error",
      无法执行: "default",
    };
    const status = CONFIG[taskStatus];

    return (
      <div>
        <Badge status={status} />
        <span>{taskStatus}</span>
      </div>
    );
  }