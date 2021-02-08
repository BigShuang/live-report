function show_page_1() {
    var s1t = document.getElementById('s1-live-day');
    s1t.innerText= all_count;

    var textWrapper = document.querySelector('.main-title .prefix-letters');
    var prefix_text = "2020年你直播了"
    textWrapper.innerHTML = prefix_text.replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');

    var textWrapper = document.querySelector('.main-title .suffix-letters');
    var suffix_text = "天"
    textWrapper.innerHTML = suffix_text

    anime.timeline({loop: false})
        .add({
            targets: '#s1-title .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 60,
            delay: (el, i) =>  100 + 40 * i
        });

//    https://www.chartjs.org/docs/latest/getting-started/
    var ctx = document.getElementById('s1-chart');
    var chartData = {
        labels: months_labels,
        datasets: [{
            label: '每月直播天数',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: count_list,
            fill: false,
            pointRadius: 10,
        }]
    };

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: OPTIONS1,
    });
}


function turn_page_1() {
    anime.timeline({loop: false})
    .add({
        targets: '#s0-title',
        opacity: [1, 0.1],
        easing: "easeOutExpo",
        duration: 1000,
    });

    anime.timeline({loop: false})
        .add({
            targets: '.s1-chart',
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

