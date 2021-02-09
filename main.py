import tkinter as tk
from tkinter import filedialog
from tkinter import ttk 

import os
import platform
import subprocess

import webbrowser

from datetime import datetime

from project_contants import default_danmuji_p, default_month
from log_reader import read_to_json
from process import output_all


win = tk.Tk()
win.geometry("900x550")
win.title("两步导出个人b站直播年报 —— 大爽歌作")

frame_1 = ttk.Frame(win)
frame_2 = ttk.Frame(win)
def select_danmu_dir():
    try:
        dir = filedialog.askdirectory()
        if dir:
            filename.set(dir)
            print(dir)

        info.set("")
    except Exception as e:
        info.set(str(e))

def open_dir():
    path=filename.get()
    try:
        if platform.system() == "Windows":
            os.startfile(path)
        elif platform.system() == "Darwin":
            subprocess.Popen(["open", path])
        else:
            subprocess.Popen(["xdg-open", path])
        
        info.set("")
    except Exception as e:
        info.set(str(e))
    
def output_live_data():
    start = (sy.get(), sm.get())
    end = (ey.get(), em.get())

    if int(start[0]) < int(end[0]) or (int(start[0]) == int(end[0]) and int(start[1]) < int(end[1])):
        path=filename.get()
        if os.path.exists(path) and os.path.isdir(path):
            try:
                info.set("数据导出中（导出成功后会自动跳转到下一界面）")
                win.update()
                read_to_json(path, start, end)
                output_all(start, end)
                info.set("OK")
                next_step()
            except Exception as e:
                info.set(str(e))
        else:
            info.set("文件夹不存在")
    else:
        info.set("时间区间不存在")

import tkinter.font as tkFont
def_font = tk.font.nametofont("TkDefaultFont")
font_2 = def_font.copy()
font_2.config(size=22)

ttk.Label(frame_1, text=" 1 - 选择弹幕姬日志所在的文件夹，导出弹幕数据。", font=font_2, foreground="#ff6384").grid(row=0, columnspan=2)
ttk.Label(frame_1, text="弹幕姬日志格式为yyyy-mm-dd.txt, 例如2020-03-15.txt").grid(row=1, columnspan=2)

b0 = ttk.Button(frame_1, text="选择弹幕姬文件夹", command=select_danmu_dir)
b0.grid(row=2, column=0)

filename = tk.StringVar(frame_1, value=default_danmuji_p)
info = tk.StringVar(win, value="")

lable1 = ttk.Entry(frame_1, textvariable=filename, state="disabled", width=40)
lable1.grid(row=2, column=1)

# b1 = ttk.Button(frame_1, text="打开选中文件夹进行检查", command=open_dir)
# b1.grid(row=3, columnspan=2)


label2 = ttk.Label(frame_1, text="确定年报时间区间")
label2.grid(row=4, columnspan=2)

frame_s1 = ttk.Frame(frame_1)
frame_s1.grid(row=5, columnspan=2)

default_year = datetime.now().year - 1

sy = tk.StringVar(win, value=str(default_year))
sm = tk.StringVar(win, value=str(default_month))

ey = tk.StringVar(win, value=str(default_year+1))
em = tk.StringVar(win, value=str(default_month))

ttk.Combobox(frame_s1, values=[str(default_year + i - 2) for i in range(5)],
    textvariable=sy, width=5).grid(row=0, column=0)
ttk.Label(frame_s1, text="年").grid(row=0, column=1)
ttk.Combobox(frame_s1, values=["{:0>2}".format(i+1) for i in range(12)],
    textvariable=sm, width=3).grid(row=0, column=2)
ttk.Label(frame_s1, text="月(含) —— ").grid(row=0, column=3)
ttk.Combobox(frame_s1, values=[str(default_year + i - 2) for i in range(5)],
    textvariable=ey, width=5).grid(row=0, column=4)
ttk.Label(frame_s1, text="年").grid(row=0, column=5)
ttk.Combobox(frame_s1, values=["{:0>2}".format(i+1) for i in range(12)],
    textvariable=em, width=3).grid(row=0, column=6)
ttk.Label(frame_s1, text="月(不含)").grid(row=0, column=7)

sty = ttk.Style()
sty.configure('my.TButton', font=font_2, foreground="#ff6384")

b2 = ttk.Button(frame_1, text="导出年报数据", style='my.TButton', command=output_live_data)
b2.grid(row=6, columnspan=2, pady=20)

label3 = ttk.Label(frame_1, textvariable=info, foreground="red")
label3.grid(row=7, columnspan=2, pady=10)

def view_author(event):
    webbrowser.open("https://space.bilibili.com/149259132")

def view_project(event):
    webbrowser.open("https://github.com/BigShuang/live-report")


sty = ttk.Style()
sty.configure('my.TLabel', underline=1,
    font=("",12, "underline"))

al = ttk.Label(frame_1, text="关于作者——大爽歌", style='my.TLabel')
al.grid(row=8, columnspan=2)
pl = ttk.Label(frame_1, text="view in github", style='my.TLabel')
pl.grid(row=9, columnspan=2, pady=10)

al.bind("<Button-1>", view_author)
pl.bind("<Button-1>", view_project)

frame_1.pack()


ttk.Label(frame_2, text=" 2 - 查看个人直播年报", font=font_2, foreground="#ff6384").grid(row=0, columnspan=3)

ttk.Label(frame_2, text="填写你的b站昵称：", width=15).grid(row=1, column=0)

username = tk.StringVar(frame_2, value="")
info2 = tk.StringVar(frame_2, value="请更新年报用户名为你的b站昵称，更新一次即可")
lable1 = ttk.Entry(frame_2, textvariable=username, width=25)
lable1.grid(row=1, column=1, padx=10)

def update_username():
    try:
        name = username.get()
        name = name.strip()
        if name:
            jsfp = "js/name.js"
            with open(jsfp, 'w', encoding="utf-8") as fw:
                fw.write("var UP_NAME = '%s'" % name)
            info2.set("更新成功")
        else:
            info2.set("名字为空")
    except Exception as e:
        info2.set(str(e))

def view_raw_report():
    project_path = os.getcwd()
    # file:///F:/UP%20PIG/myprojects/live-report/main.html
    raw_url_path = "file:///" + os.path.join(project_path, "raw.html")
    webbrowser.open(raw_url_path)

def view_main_report():
    project_path = os.getcwd()
    # file:///F:/UP%20PIG/myprojects/live-report/main.html
    raw_url_path = "file:///" + os.path.join(project_path, "main.html")
    webbrowser.open(raw_url_path)

    
ttk.Button(frame_2, text="更新年报用户名为你的昵称", width=25, command= update_username).grid(row=1, column=2)
ttk.Label(frame_2, textvariable=info2, foreground="red").grid(row=2, columnspan=3, column=0)

ttk.Button(frame_2, text="查看原始年报", width=25, style='my.TButton', command= view_raw_report).grid(row=3, columnspan=3, pady=10)

ttk.Label(frame_2, text=" 最后温馨提示：", font=font_2, foreground="#ff6384").grid(row=4, columnspan=3)
lines = [
    "如果你要录制视频投稿的话，推荐你筛选下导出数据中的弹幕",
    "删掉不适合公开的，比如无前后文后易产生歧义甚至引战的，或者泄露个人隐私的",
    "具体操作方法见docs/custom.md文档中的1. 筛选弹幕内容",
]

for i, line in enumerate(lines):
    ttk.Label(frame_2, text=line).grid(row=5+i, columnspan=3)

ttk.Button(frame_2, text="按文档手动修改完成后，方可点击查看修改后的年报", style='my.TButton', command= view_main_report).grid(row=5+len(lines), columnspan=3, pady=10)
ttk.Label(frame_2, text="更多操作可以打开项目文件夹下README.md了解（可用记事本打开）", foreground="#ff6384").grid(row=6+len(lines), columnspan=3, pady=10)

al = ttk.Label(frame_2, text="关于作者——大爽歌", style='my.TLabel')
al.grid(row=7+len(lines), columnspan=3)
pl = ttk.Label(frame_2, text="view in github", style='my.TLabel')
pl.grid(row=8+len(lines), columnspan=3, pady=10)

al.bind("<Button-1>", view_author)
pl.bind("<Button-1>", view_project)

def next_step():
    frame_1.pack_forget()
    frame_2.pack()


# next_step()


win.mainloop()