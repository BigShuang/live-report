
#### 生成过程
1. 从弹幕姬日志中读取日志文件（txt)
   分析后按月存储到本项目的log_json文件夹中（存为json）
   —— 该过程调用`log_reader.py`的`read_to_json`方法完成

2. 从log_json文件夹下json文件中
   读取分析并导出数据到`js/raw`文件夹中（存为js文件）
   —— 该过程调用`process.py`的`output_all`方法完成

3. 手动复制`js/raw`文件夹中的js文件到`js/screened`文件夹中，
   然后对`js/screened`中的json文件中的弹幕进行手工的筛选（主要是剔除下那些不适合在投稿中公开的，比如涉及隐私，失去前后文意思导致容易引战这些的），
   有弹幕的场景JS文件：`js\screened\data_s3.js`、`js\screened\data_s6.js`

4. 代开main.html 就可以观看个人的直播年报了，按键盘右键进入下一页。


打包操作：
pip3 install pyinstaller -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install pyQt5
pip3 install pyQt5 -i https://pypi.tuna.tsinghua.edu.cn/simple

pyinstaller -F -w "F:\UP PIG\myprojects\live-report\main.py"

pyinstaller -F -w main.py


log json format:
```python
{
    "all": [], # a list of all danmu info
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": []
}
```
A danmu info
```python
[
      "2020",  # 年
      "03",  # 月
      "15",  # 日
      4,  # kind
      "21:47:37", # 时间
      "大爽歌", # 弹幕发送人
      "测试"  # 弹幕数据
]
```


SCENES（场景描述）:

1 直播了多少天

2 多少人进入了直播间，他们共进入了多少次。
某某进入次数最多，他多少次进入你的直播间

3 多少人发了弹幕

发送弹幕最多

4 多少人关注了直播间

5 多人人打赏了礼物
打赏数量最多
打赏价值最高(有些礼物是活动礼物，价值已查询不到。不好弄，已放弃)

6 舰长特写
展现舰长的弹幕（100-200条）


library use:
- chart js
- anime js

Waiting for choice:
- [Typed.js](https://www.cssscript.com/demo/highly-configurable-text-typing-library-typed-js/)
- [moving-letters](https://tobiasahlin.com/moving-letters/)