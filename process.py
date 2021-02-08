import json
import os

from log_contants import *
from util import MONTHS, get_date, get_filename, get_js_fp


def get_monthly_data(path_list, start_date, end_date, func):
    # 获取直播天数
    months = []
    month_data = []
    ly, lm = start_date
    start = True
    for p in path_list:
        y, m = get_date(get_filename(p))
        with open(p, "r", encoding="utf-8") as f:
            data = json.load(f)

        # 补齐没有直播的月份的数据
        if ly == y:
            # 年份相同， 月份不同，补齐中间月份
            if lm < m:

                if start:
                    lm_nexti = MONTHS.index(lm)
                    start = False
                else:
                    lm_nexti = MONTHS.index(lm) + 1

                mi = MONTHS.index(m)
                for i in range(lm_nexti, mi):
                    months.append("%s-%s" % (y, MONTHS[i]))
                    month_data.append(func())
        else:
            # 年份不同， 补齐去年年尾今年年初
            if start:
                lm_nexti = MONTHS.index(lm)
                start = False
            else:
                lm_nexti = MONTHS.index(lm) + 1

            mi = MONTHS.index(m)
            for i in range(lm_nexti+1, len(MONTHS)):
                months.append("%s-%s" % (ly, MONTHS[i]))
                month_data.append(func())
            for i in range(mi):
                months.append("%s-%s" % (y, MONTHS[i]))
                month_data.append(func())

        lm = m
        ly = y

        months.append("%s-%s" % (y, m))
        month_data.append(func(data))
    
    # 补齐和终止月份之间的月份数据
    while ly < end_date[0]:
        if lm is None:
            lm_nexti = 0
        else:
            if start:
                lm_nexti = MONTHS.index(lm)
                start = False
            else:
                lm_nexti = MONTHS.index(lm) + 1

        for i in range(lm_nexti, len(MONTHS)):
            months.append("%s-%s" % (ly, MONTHS[i]))
            month_data.append(func())
        lm = None

        ly = str(int(ly) + 1)

    if ly == end_date[0]:
        if lm is None:
            lm_nexti = 0
        else:
            if start:
                lm_nexti = MONTHS.index(lm)
                start = False
            else:
                lm_nexti = MONTHS.index(lm) + 1
        
        for i in range(lm_nexti, mi):
            months.append("%s-%s" % (y, MONTHS[i]))
            month_data.append(func())

    return months, month_data


def get_live_days(path_list, start_date, end_date):
    # 获取直播天数
    def get_data(data=None):
        if data is None:
            return []
        else:
            return data["days"]

    return get_monthly_data(path_list, start_date, end_date, get_data)


def output_live_days(months, days):
    # scene 1 data
    # 直播天数数据导出到js文件
    count_list = []
    all_count = 0
    for days in days:
        count = len(days)
        all_count += count
        count_list.append(count)

    jsfp = get_js_fp(1)
    with open(jsfp, 'w', encoding="utf-8") as fw:
        fw.write("var months_labels = %s\n" % months)
        fw.write("var count_list = %s\n" % count_list)
        fw.write("var all_count = %s\n" % all_count)


def get_danmu_by_kind(path_list, kind):
    res = []
    kind = str(kind)
    for p in path_list:
        with open(p, "r", encoding="utf-8") as f:
            data = json.load(f)

        if kind in data:
            kdata = data[kind]
            # print(p, len(kdata))
            # print(kdata)
            res += kdata
        else:
            print(p)

    return res


def get_above_times(dict_data, times=1):
    return {k:v for k,v in dict_data.items() if v > times}


def get_enter_info(log_list):
    danmu_enters = get_danmu_by_kind(log_list, DANMU_ENTER)

    enter_times = {}
    for e in danmu_enters:
        if e[-1] not in enter_times:
            enter_times[e[-1]] = 1
        else:
            enter_times[e[-1]] += 1

    sorted_enter_times = sorted(enter_times.items(), key=lambda x: x[1], reverse=True)

    # 进入直播间总次数， 进入直播间人数， 进入次数列表（已排序）
    return len(danmu_enters), len(enter_times), sorted_enter_times[:100]


def output_enter_info(enter_times, enter_number, enter_list):
    # scene 2 data
    s2_rank_user = []
    s2_rank_times = []
    for item in enter_list[:20]:
        user, times = item
        s2_rank_user.append(user)
        s2_rank_times.append(times)

    jsfp = get_js_fp(2)
    with open(jsfp, 'w', encoding="utf-8") as fw:
        fw.write("var s2_enter_times = %s\n" % enter_times)
        fw.write("var s2_enter_number = %s\n" % enter_number)
        fw.write("var s2_rank_user = %s\n" % s2_rank_user)
        fw.write("var s2_rank_times = %s\n" % s2_rank_times)


def get_follow_info(log_list, start_date, end_date):
    # 每月关注人数

    def get_data(data=None):
        if data is None:
            return []
        else:
            follows = data[str(DANMU_FOLLOW)]
            return [item[4] for item in follows]

    return get_monthly_data(log_list, start_date, end_date, get_data)


def output_follow_info(months, month_follows):
    # scene 4 data
    # 关注数据导出到js文件
    all_follow_count = 0
    count_list = []

    for follows in month_follows:
        count = len(follows)
        all_follow_count += count
        count_list.append(count)

    jsfp = get_js_fp(4)
    with open(jsfp, 'w', encoding="utf-8") as fw:
        fw.write("var s4_all_count = %s\n" % all_follow_count)
        fw.write("var s4_months_labels = %s\n" % months)
        fw.write("var s4_count_list = %s\n" % count_list)
        fw.write("var s4_follow_names = %s\n" % month_follows)
        


def get_danmu_info(log_list):
    danmu_says = get_danmu_by_kind(log_list, DANMU_SAY)

    says_dict = {}
    for say in danmu_says:
        name, word = say[-2], say[-1]
        name = name.replace("[管]", "")
        name = name.replace("[爺]", "")
        if name in says_dict:
            says_dict[name].append(word)
        else:
            says_dict[name] = [word]
    
    sorted_says = sorted(says_dict.items(), key=lambda x: len(x[1]), reverse=True)

    # for i in range(1000):
    #     print(sorted_says[i][0], end=", ")
    #     if i % 10 == 0:
    #         print()

    return len(danmu_says), len(says_dict), sorted_says[:100]


def output_danmu_info(says_count, says_pnum, says_list):
    # scene 3 data
    # 弹幕发言统计
    s3_rank_user = []
    s3_rank_times = []
    s3_rank_danmus = []
    for item in says_list[:20]:
        user, says = item
        s3_rank_user.append(user)
        s3_rank_times.append(len(says))
        s3_rank_danmus.append(says[:15])

    
    jsfp = get_js_fp(3)
    with open(jsfp, 'w', encoding="utf-8") as fw:
        fw.write("var s3_says_count = %s\n" % says_count)
        fw.write("var s3_says_pnum = %s\n" % says_pnum)
        fw.write("var s3_rank_user = %s\n" % s3_rank_user)
        fw.write("var s3_rank_times = %s\n" % s3_rank_times)

        fw.write("var s3_rank_danmus = [\n" )
        for row in s3_rank_danmus:
            fw.write("    %s,\n" % row)
        fw.write("]" )


def get_gift_info(log_list):
    danmu_gift = get_danmu_by_kind(log_list, DANMU_GIFT)
    # print(len(danmu_gift))
    # print(danmu_gift[0])

    gift_dict = {}  # username: {gift_name: number}
    for item in danmu_gift:
        username, giftname, number = item[-3:]
        number = int(number)
        if username not in gift_dict:
            gift_dict[username] = {giftname: number}
        elif giftname not in gift_dict[username]:
            gift_dict[username][giftname] = number
        else:
            gift_dict[username][giftname] += number
    
    gift_counts = {
        name: sum(gifts.values()) for name, gifts in gift_dict.items()
    }
    gift_gold = {
        name: sum( GOLD_GIFT_DICTS.get(gname, 0)* num for gname, num in gifts.items()) for name, gifts in gift_dict.items()
    }
    gift_scores = {
        name: sum( SILVER_GIFT_DICTS.get(gname, 0)* num for gname, num in gifts.items()) for name, gifts in gift_dict.items()
    }

    sorted_gift_counts = sorted(gift_counts.items(), key=lambda x: x[1], reverse=True)
    sorted_gift_gold = sorted(gift_gold.items(), key=lambda x: x[1], reverse=True)
    sorted_gift_scores = sorted(gift_scores.items(), key=lambda x: x[1], reverse=True)

    return gift_dict, sorted_gift_counts, sorted_gift_gold, sorted_gift_scores


def output_gift_info(gift_dict, sorted_gift_counts, sorted_gift_gold, sorted_gift_scores):
    # scene 5 data
    rank_user = []
    gift_counts = []
    for row in sorted_gift_counts[:20]:
        name, num = row
        rank_user.append(name)
        gift_counts.append(num)

    jsfp = get_js_fp(5)
    with open(jsfp, 'w', encoding="utf-8") as fw:
        fw.write("var s5_all_count = %s\n" % len(gift_dict))
        fw.write("var s5_rank_user = %s\n" % rank_user)
        fw.write("var s5_gift_counts = %s\n" % gift_counts)
        fw.write("var s5_rank_gifts =  [ \n" )

        # add top 5 gift details
        for username in rank_user[:5]:
            user_gift_dict = gift_dict[username]
            # sorted by gift number
            sorted_user_gift = sorted(user_gift_dict.items(), key=lambda x: x[1], reverse=True) 
            # no tuple in js, cast to list
            sorted_user_gift = [list(item) for item in sorted_user_gift]
            fw.write("    %s,\n" % (sorted_user_gift))
        fw.write("] \n" )

def get_aboard_info(log_list):
    captain_list = get_danmu_by_kind(log_list, DANMU_BOARD)
    captains = []
    for captain_info in captain_list:
        captains.append(captain_info[-3:-1])

    # 排序
    captains.sort(key=lambda x: ABOARD_RANK.get(x[1], 3))

    # 获取船员发言
    danmu_says = get_danmu_by_kind(log_list, DANMU_SAY)

    says_dict = {}
    for say in danmu_says:
        name, word = say[-2], say[-1]
        name = name.replace("[管]", "")
        name = name.replace("[爺]", "")
        if name in says_dict:
            says_dict[name].append(word)
        else:
            says_dict[name] = [word]
    
    captains_danmus = [says_dict[captain[0]][:200] for captain in captains]
    return captains, captains_danmus


def output_aboard_info(captains, captains_danmus):
    # scene 6 data
    captain_names = [captain[0] for captain in captains]
    captain_ranks = [captain[1] for captain in captains]
    jsfp = get_js_fp(6)
    with open(jsfp, 'w', encoding="utf-8") as fw:
        fw.write("var s6_captain_names = %s\n" % captain_names)
        fw.write("var s6_captain_ranks = %s\n" % captain_ranks)
        fw.write("var s6_captain_danmus =  [ \n" )
        for danmus in captains_danmus:
            fw.write("    [ \n        " )
            for i in range(len(danmus)):
                fw.write('"%s", ' % danmus[i])
                if (i+1) % 15 == 0 and i + 1 != len(danmus):
                    fw.write("\n        ")
            fw.write("\n    ],\n" ) 
        fw.write("]" ) 


def output_all(start_time, end_time, debug=False):
    log_path = "log_json"
    log_list = [os.path.join(log_path, log) for log in os.listdir(log_path)]
    # debug = True
    if not debug:
        # 1 - 直播天数
        res1 = get_live_days(log_list, start_time, end_time)
        output_live_days(*res1)
        # 2 - 进入次数
        res2 = get_enter_info(log_list)
        output_enter_info(*res2)
        # 3 - 弹幕列表
        res3 = get_danmu_info(log_list)
        output_danmu_info(*res3)
        # 4 - 关注信息
        res4 = get_follow_info(log_list, start_time, end_time)
        output_follow_info(*res4)
        # 5 - 打赏信息
        res5 = get_gift_info(log_list)
        output_gift_info(*res5)
        # 6 - 舰长特写 -> 上船特写
        res6 = get_aboard_info(log_list)
        output_aboard_info(*res6)
    else:
        res6 = get_aboard_info(log_list)
        output_aboard_info(*res6)


if __name__ == '__main__':
    output_all()