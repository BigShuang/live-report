# live-report
generate a cool annual report for bilibili Live anchor


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

Waiting for choice:
- [Typed.js](https://www.cssscript.com/demo/highly-configurable-text-typing-library-typed-js/)
- [moving-letters](https://tobiasahlin.com/moving-letters/)