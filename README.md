# live-report
generate a cool annual report for bilibili Live anchor


### 两步生成年报的可视化界面（exe）已完成。
即项目文件夹下的`main_zh.exe`

**年报生成器操作流程：**
1 - 选择弹幕姬所在文件夹
2 - 导出数据（json文件）
3 - 数据导出成功后程序会展示新的一页
4 - 直接查看原始数据生成的年报
5 - 手动筛选数据后，查看修改后的年报


1 直播天数
2 进入直播间次数
3 弹幕数量



项目技术路线：
- python3 读取分析弹幕姬日志
- html/css/js 展示年报

使用到的js library:
- chart.js
- anime.js
  

技术细节见： details.md
