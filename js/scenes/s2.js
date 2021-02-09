function turn_page_2() {
    anime.timeline({loop: false})
        .add({
            targets: '#s1-title .dynamic-letters',
            translateY: [0, -100],
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) => 40 * i
        });

    anime.timeline({loop: false})
        .add({
            targets: '.s1-chart',
            translateX: [0, -1500],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });

    anime.timeline({loop: false})
        .add({
            targets: '.s2-chart',
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


function show_page_2() {
    // remove UP user's data

    // 这里为了性能牺牲了精确： 只从进入次数最多的20个用户中寻找UP主，
    // 因为有的直播间可能进入人数太多， 从所有人中去找可能非常卡顿
    if(s2_rank_user.findIndex(element => element == UP_NAME) >= 0){
        const index = s2_rank_user.findIndex(element => element == UP_NAME)
        const up_times = s2_rank_times[index]
        s2_rank_user.splice(index, 1)
        s2_rank_times.splice(index, 1)
        s2_enter_times -= up_times
        s2_enter_number -= 1
    }

    document.getElementById('s2-enter-number').innerText = s2_enter_number;
    document.getElementById('s2-enter-times').innerText = s2_enter_times;
    document.getElementById('s2-super-star').innerText = s2_rank_user[0];
    document.getElementById('s2-super-num').innerText = s2_rank_times[0];
    //  多少人进入了直播间，他们共进入了多少次。
    document.getElementById('s2-letters-1').innerHTML = "人进入了直播间，他们共进入了".replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');
    document.getElementById('s2-letters-2').innerHTML = "次";
    //  某某进入次数最多，TA多少次进入你的直播间
    document.getElementById('s2-letters-3').innerHTML = "进入次数最多，进了".replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');
    document.getElementById('s2-letters-4').innerHTML = "次"

    anime.timeline({loop: false})
        .add({
            targets: '#s2-title .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 60,
            delay: (el, i) =>  100 + 40 * i
        });

    var chartData = {
        labels: s2_rank_user,
        datasets: [{
            label: '进入直播间次数',
            data: s2_rank_times,
            backgroundColor: COLORS2,
            fill: false,
        }]
    };


    var ctx = document.getElementById('s2-chart');

    var suggestMax = 10
    if(s2_rank_times.length>0){
        if(Math.ceil(s2_rank_times[0] * 1.05) > suggestMax){
            suggestMax = Math.ceil(s2_rank_times[0] * 1.05)
        }
    }
    OPTIONS2["scales"]["xAxes"][0]["ticks"]["suggestedMax"] = suggestMax

    s2_rank_times[0]
    var s2_chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: chartData,
        options: OPTIONS2
    });

}