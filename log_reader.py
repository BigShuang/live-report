"""
read txt of everyday log from danmuji.
"""
import os
import json
import re
from log_contants import TIME_REGEX, DANMU_REGEX, DAY_REGEX
from util import check_and_create

search_word = "關注了直播間"
log_json_dir = "log_json"


def read_txt(danmu_path, txt_path, day_data, res={}):
    abs_path = os.path.join(danmu_path, txt_path)
    with open(abs_path, "r", encoding="utf-8") as f:
        fl = f.read()

    lines = fl.split("\n")

    if not res:
        res = {"all": [], "days": []}
        for kind in DANMU_REGEX:
            res[kind] = []

    for line in lines:
        # print("line: ", line)  # debug use
        for kind in DANMU_REGEX:
            regex = TIME_REGEX + DANMU_REGEX[kind]
            match_obj = re.search(regex, line)
            if match_obj:
                data = match_obj.groups()

                res["all"].append(day_data + (kind, ) + data)
                res[kind].append(day_data + data)

    if day_data[-1] not in res["days"]:
        res["days"].append(day_data[-1])

    return res


def read_to_json(danmu_path, start_date, end_date):
    exist = os.path.exists(danmu_path)
    print(exist)
    if exist:
        check_and_create(log_json_dir)
        file_list = os.listdir(danmu_path)
        txt_list = [file for file in file_list if os.path.splitext(file)[1] == ".txt"]

        last_year = "0"
        last_month = "0"

        month_data = {}

        for t in txt_list:
            day, suffix = os.path.splitext(t)

            match_obj = re.search(DAY_REGEX, day)
            if match_obj:
                day_data = match_obj.groups()

                year, month = day_data[0], day_data[1]
                if year < start_date[0] or (year == start_date[0] and month < start_date[1]):
                    continue

                if year > end_date[0] or (year == end_date[0] and month >= end_date[1]):
                    break

                if last_month == "0":
                    last_year = day_data[0]
                    last_month = day_data[1]
                    month_data = read_txt(danmu_path, t, day_data)
                elif last_month != day_data[1]:
                    with open("log_json/%s_%s.json" % (last_year, last_month), "w", encoding="utf-8") as f:
                        json.dump(month_data, f, ensure_ascii=False)
                    last_year = day_data[0]
                    last_month = day_data[1]
                    month_data = read_txt(danmu_path, t, day_data)
                else:
                    read_txt(danmu_path, t, day_data, month_data)
        
        if last_year != "0" and last_month != "0":
            with open("log_json/%s_%s.json" % (last_year, last_month), "w", encoding="utf-8") as f:
                json.dump(month_data, f, ensure_ascii=False)


if __name__ == '__main__':
    danmu_path = "D:\Documents\弹幕姬"
    read_to_json(danmu_path)