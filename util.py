import os
from project_contants import raw_dir, data_suffix

MONTHS = ["{:0>2}".format(i) for i in range(1,13)]


def get_filename(abs_file):
    file = os.path.split(abs_file)[-1]
    filename = os.path.splitext(file)[0]
    return filename


def get_date(date_str):
    year, month = date_str.split("_")
    return (year, month)
    

def check_and_create(one_dir):
    if not os.path.exists(one_dir):
        b = os.getcwd()
        os.mkdir(os.path.join(b, one_dir))


def get_js_fp(index):
    return os.path.join(raw_dir, "%s%s.js" % (data_suffix, index))



if __name__ == '__main__':
    f1 = r"F:\UP PIG\myprojects\live-report\log_json\2020_03.json"
    get_filename(f1)


