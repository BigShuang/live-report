from log_contants import *
import re


s = """
21:51:57 : 收到彈幕:大爽歌 說: 123
21:54:25 : 收到彈幕:大爽歌 說: 6666666
"""

reg = TIME_REGEX + DANMU_REGEX[DANMU_SAY]

# r = re.search(reg, s)
# print(r)
# print(r.group(0))
# print(r.group(1))
# print(re.match(DAY_REGEX, "2020-03-15.txt"))

a = {"a": [123]}
b = {"a": []}

a.update(b)

print(a)