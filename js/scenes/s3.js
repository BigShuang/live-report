function turn_page_3() {
    anime.timeline({loop: false})
        .add({
            targets: '#s2-title .dynamic-letters',
            translateY: [0, -100],
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) => 40 * i
        });

    anime.timeline({loop: false})
        .add({
            targets: '.s2-chart',
            translateX: [0, -1500],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });
}


function show_page_3() {
    // remove UP user's data

    // 这里为了性能牺牲了精确： 只从进入次数最多的20个用户中寻找UP主，
    // 因为有的直播间可能进入人数太多， 从所有人中去找可能非常卡顿
    if(s3_rank_user.findIndex(element => element == UP_NAME) >= 0){
        const index = s3_rank_user.findIndex(element => element == UP_NAME)
        const up_times = s3_rank_times[index]
        s3_rank_user.splice(index, 1)
        s3_rank_times.splice(index, 1)
        s3_rank_danmus.splice(index, 1)
        s3_says_count -= up_times
        s3_says_pnum -= 1
    }

    document.getElementById('s3-says-count').innerText = s3_says_count;
    document.getElementById('s3-says-pnum').innerText = s3_says_pnum;
    document.getElementById('s3-super-star').innerText = s3_rank_user[0];
    document.getElementById('s3-super-num').innerText = s3_rank_times[0];
    //  多少人发了弹幕，他们共发了多少条
    document.getElementById('s3-letters-1').innerHTML = "人发了弹幕，他们共发了".replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');
    document.getElementById('s3-letters-2').innerHTML = "条";
    //  某某发弹幕次数最多，发了多少条
    document.getElementById('s3-letters-3').innerHTML = "发弹幕最多，发了".replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');
    document.getElementById('s3-letters-4').innerHTML = "条"

    anime.timeline({loop: false})
        .add({
            targets: '#s3-title .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 60,
            delay: (el, i) =>  100 + 40 * i
        });

    var chartData = {
        labels: s3_rank_user,
        datasets: [{
            label: '发弹幕排行',
            data: s3_rank_times,
            backgroundColor: COLORS2,
            fill: false,
        }]
    };


    // generate danmuku div in html
    var danmu_count = 0
    var danmu_length = []  // record the danmu length in one row to avoid overlying
    var s3_danmus_copy = [];  // a array to copy s3_rank_danmus

    while(true){
        var all_empty = true;
        for(var di=0; di<s3_rank_danmus.length; di++) {
            // deep copy s3_rank_danmus array
            if(s3_danmus_copy[di] == undefined){
                s3_danmus_copy[di] = s3_rank_danmus[di].concat()
            }

            // not use all danmu, just select some
            if(s3_danmus_copy[di].length>5){
                all_empty = false;

                var danmu_user = s3_rank_user[di]
                var danmu = s3_danmus_copy[di].pop();

                var div = document.createElement("div");
                div.setAttribute('class', 'rolling-danmuku');
                
                if(danmu_length.length>=DANMU_LEVEL){
                    top_index = danmu_length.indexOf(Math.min(...danmu_length));
                }else{
                    top_index = danmu_length.length
                }
                div.style.top = DANMU_MARGIN_TOP + top_index * 36 + "px";
                div.style.color = COLORS2[di]

                danmu_length[top_index] = danmu_length[top_index] == undefined ? Math.floor(Math.random() * (di % 12)) * 20 : danmu_length[top_index]
                
                div.style.left = danmu_length[top_index] + "px";
                
                danmu_length[top_index] += (danmu_user + danmu).length * 25 + 30 * 5;
                
                if(HIGH_EFFECT){
                    div.innerHTML = '<span style="background: '+ COLORS2[di] +'60; color: #555">' + danmu_user + ': </span>' + danmu;
                }else {
                    div.innerHTML = danmu_user + ': ' + danmu;  
                }

                document.getElementById("s3-board").appendChild(div);
                danmu_count += 1

                if(danmu_count > MAX_DANMU_COUNT) {
                    all_empty = true;
                    break
                }
            }
        }

        if(all_empty){
            break;
        }
    }
    console.log(danmu_count)
    console.log(danmu_length)

    var max_danmu_length = Math.max(...danmu_length);
    console.log(max_danmu_length);

    // for(var i = 0; i< DANME_SPEED_LEVEL; i++){
    //     anime.timeline({loop: false})
    //     .add({
    //         // targets: '#s3-board .rolling-danmuku',
    //         targets: '#s3-board .rolling-danmuku.danmu-speed-'+i,
    //         translateX: [1200, Math.round((1200-max_danmu_length)/2)],
    //         translateY: 0,
    //         translateZ: 0,
    //         // opacity: 1,
    //         opacity: {
    //             value:[0,1],
    //             duration: 1000,
    //         },
    //         easing: "linear",
    //         duration: (5-i) * 2000,
    //     }).add({
    //         // targets: '#s3-board .rolling-danmuku',
    //         targets: '#s3-board .rolling-danmuku.danmu-speed-'+i,
    //         translateX: [Math.round((1200-max_danmu_length)/2), -max_danmu_length],
    //         translateY: 0,
    //         translateZ: 0,
    //         easing: "linear",
    //         duration: (i+4) * 2000,
    //     })
    // }

    anime.timeline({loop: false})
        .add({
            targets: '#s3-board .rolling-danmuku',
            translateX: [window.innerWidth, -max_danmu_length],
            translateY: 0,
            translateZ: 0,
            easing: custom_easing,
            duration: (window.innerWidth+max_danmu_length) * 4,
    });
    
    var ctx = document.getElementById('s3-chart');

    var suggestMax = 10
    if(s3_rank_times.length>0){
        if(Math.ceil(s3_rank_times[0] * 1.05) > suggestMax){
            suggestMax = Math.ceil(s3_rank_times[0] * 1.05)
        }
    }
    OPTIONS3["scales"]["xAxes"][0]["ticks"]["suggestedMax"] = suggestMax

    var s3_chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: chartData,
        options: OPTIONS3
    });


    anime.timeline({loop: false})
        .add({
            targets: '.s3-chart',
            translateX: [1260, 0],
            translateY: 0,
            translateZ: 0,
            opacity: {
                value:[0,1],
                duration: 1000,
            },
            easing: "easeInSine",
            duration: 2000,
            delay: (window.innerWidth+max_danmu_length) * 4 - 4000
        });

}
