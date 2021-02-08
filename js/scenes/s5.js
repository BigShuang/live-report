function turn_page_5() {
    anime.timeline({loop: false})
        .add({
            targets: '#s4-title .dynamic-letters',
            translateY: [0, -100],
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) => 40 * i
        });

    anime.timeline({loop: false})
        .add({
            targets: '.s4-chart',
            translateX: [0, -1500],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });

    anime.timeline({loop: false})
        .add({
            targets: '.s5-chart',
            translateX: [1500, 0],
            translateY: 0,
            translateZ: 0,
            opacity: {
                value:[0,1],
                duration: 1000,
            },
            easing: "easeOutExpo",
            duration: 2000,
        });
}


function show_page_5() {
    document.getElementById('s5-feed-count').innerText= s5_all_count;

    var letters1 = document.querySelector('#s5-letters-1');
    var prefix_text = "人投喂了礼物"
    letters1.innerHTML = prefix_text.replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');

    document.getElementById('s5-super-star').innerText= s5_rank_user[0];
    var letters2 = document.querySelector('#s5-letters-2');
    var prefix_text = "投喂了最多的礼物"
    letters2.innerHTML = prefix_text.replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');


    anime.timeline({loop: false})
        .add({
            targets: '#s4-title .dynamic-letters',
            translateY: [0, -100],
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) => 40 * i
        })
        .add({
            targets: '#s5-title .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 60,
            delay: (el, i) =>  100 + 40 * i
        });

//    https://www.chartjs.org/docs/latest/getting-started/
    var ctx = document.getElementById('s5-chart');
    var chartData = {
        labels: s5_rank_user,
        datasets: [{
            label: '投喂数量排行',
            backgroundColor: COLORS2,
            data: s5_gift_counts,
            fill: false,
            pointRadius: 10,
        }]
    };

    var myLineChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: chartData,
        options: OPTIONS2,
    });

    add_s5_danmu()
    anime.timeline({loop: false})
        .add({
            targets: '.danmu-content #s5-board .static-danmuku',
            opacity: [0, 1],
            easing: "easeInSine",
            duration: 1000,
            delay: (el, i) => 150 * i
        });

}


function add_s5_danmu(){
    var wh = window.innerHeight, 
        ww = window.innerWidth;

    var i = 0;
    var locations = [
        // x(left), y(top)
        [20, 20], [250, 70], [ww - 350, wh-180],
        [ww-600, 20], [ww - 700, wh-200],  [ww-300, 140],
        [ww - 450, wh-100], [ww-500, wh-370], [ww-300, wh-300],
        [300, 180], [ww - 600, wh-250], [ww-450, 80],
        [80, 130], [ww - 850, wh-90], [ww-400, wh-450]
    ]

    // Shuffle the array. (Some long names are hard to handle, I choose to comment it.)
    // Notice: If you are editing an array and want to see the effect of you locations setting
    //         it is recommended to comment the following code
    // for(var k=0; k < locations.length; k++){
    //     var a=parseInt(Math.random()*locations.length);
    //     var temp=locations[a];
    //     locations[a]=locations[k];
    //     locations[k]=temp;
    // }

    for(var ri=0; ri < s5_rank_gifts.length; ri++){
        for(var j=0; j < s5_rank_gifts[ri].length; j++){
            var div = document.createElement("div");
            div.setAttribute('class', 'static-danmuku');
            div.style.left = locations[i][0] + "px";
            div.style.top = locations[i][1] + "px";
            div.style.color = COLORS2[ri]

            var danmu = ' 投喂了 <span class="strong">' + s5_rank_gifts[ri][j][0] + '</span> 总' + s5_rank_gifts[ri][j][1] +  '个';

            div.innerHTML = '<span style="background: '+ COLORS2[ri] +'80; color: #fff">&nbsp;' +
            s5_rank_user[ri] + '&nbsp;</span>' + danmu;
            document.getElementById("s5-board").appendChild(div);
            i += 1
            if(!(i<GIFT_DANMU_MAXNUM && i < locations.length)){
                return
            }
        }
    }
        
}