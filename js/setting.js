const MAX_DANMU_COUNT = 100;  // for scene 3
const DANMU_LEVEL = 15;  // the rows count of danmu to show
const DANMU_MARGIN_TOP = 200;

const BACKGROUNDCOLOR = "#eeeeee"

 // High effect requires high computer performance
 // otherwise the display is very poor
const HIGH_EFFECT = false; 


const GIFT_DANMU_MAXNUM = 15  // for scene 5
// Simply increasing GIFT_DANMU_MAXNUM value is invalid
// (You need to add location in s5.js->function add_s5_danmu->locations)


// for scene 6
const S6_DANMU_MAXNUM_1 = 150   // 如果只有一个大航海，就展示该舰长前S6_DANMU_MAXNUM_1条弹幕
const S6_DANMU_MAXNUM_2 = 12  // 如果只有多个，就展示每位舰长前S6_DANMU_MAXNUM_2条弹幕
const S6_DANMU_DURATION = 1500

// 如果有多个大航海，各大航海船员将按这个颜色循环展示
var COLORS6 = [
    '#ff6384', '#EE82EE', '#7B68EE', '#00BFFF', '#2ECC71',
    '#EB547D', '#9F6AA7', '#5476B3', '#2BB19B', '#70B984'
]


const ONLY_POEMS = false ;  // 最后一页单独展示诗

