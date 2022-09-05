# 项目初步搭建思路

### 架构初步体现

- 1.用 create-react-app 搭建
- 2.要用到 antd 组件库，所以要按 antd 里的步骤来搭建
- 3.初步搭建好后，删除掉没用的文件和内容
- 4.安装 antd 插件
- 5.将 antd 的样式文件引入到 App.css 文件
- 6.样式文件用 less，根据网页提示进行安装下载
- 7.新增文件夹 components(没有路由样式的文件)、pages(有路由的文件)、routes(路由相关文件)
- 8.需要在 components 文件夹里再新建一个名为 Layout 的文件夹，里面的 jsx 文件直接以 index 命名，因为可以通过 Layout 文件夹直接找到相关的文件
- 9.Layout 文件里的相关内容进行删减(要删除哪些需要自己再多练多分析)
- 10.less 文件夹命名加上.module，再通过 styles 引入文件，在 className 处进行引入使用，目的是为了使类名随机化，避免固定类名与其它类名发生冲突
- 11.根据需要从 antd 引入相关组件样式，因为左侧菜单栏内 items 有很多个，所以可以单独写一个名为 items 的对象，里面包括左侧菜单栏所有的 items，每个 item 都是一个对象，里面包含：key(唯一标识符，可以通过 key 快速添加编辑或删除对应标志符的对象)、icon(使用到的组件名)、children(该 item 是否有延伸组件，没有则写[])、label(写入路由地址，用 Link 代替 a 标签，内容就写上对应名称)
- 12.在 antd 里找到 Menu 组件，选择相对应的组件样式，引入到 Layout 文件，在对应位置再引入 items
- 13.在 pages 文件夹中新建 items 相关的文件夹，建好之后在路由文件夹内引入相关 item 组件，以路由表的形式(类似于 vue 里的路由)->
  最外层 Layout：path(路径名)、element(组件名)、exact 设置为 true，暴露路由，写完后再写 children 路由，一对象的形式，添加子路由，格式和上面一致，不用再写 exact，外层路由暴露一次就可以了，最后再写一个 404 路径，路由地址不存在时会触发，path 默认为 \* ，从 pages 文件夹内新建 NotFound 文件夹引入
- 14.要想使路由生效，需要在 index.js 文件中从 react-router-dom 中引入 BrowserRouter 组件，用于包裹 App 组件，才能生效

* 最后一个大概雏形就出来了，header 部分引入相关要求样式，可以用 antd 的 space 间距组件进行修饰
