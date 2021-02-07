function turn_page_4() {
    // Specially treat scene that there is a delay in the presentation of the chart 
    anime.timeline({loop: false})
        .add({
            targets: '.s3-cc',
            translateX: [0, -1500],
            opacity: [1, 0],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });
    
    anime.timeline({loop: false})
        .add({
            targets: '#s3-board',
            opacity: [1, 0],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });    


    anime.timeline({loop: false})
        .add({
            targets: '.s4-chart',
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


function show_page_4() {
    var s4t = document.getElementById('s4-follow-pnum');
    s4t.innerText= s4_all_count;

    var letters = document.querySelector('#s4-letters');
    var prefix_text = "人关注了直播间"
    letters.innerHTML = prefix_text.replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');

    anime.timeline({loop: false})
        .add({
            targets: '#s3-title .dynamic-letters',
            translateY: [0, -100],
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) => 40 * i
        })
        .add({
            targets: '#s4-title .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 60,
            delay: (el, i) =>  100 + 40 * i
        });

//    https://www.chartjs.org/docs/latest/getting-started/
    var ctx = document.getElementById('s4-chart');
    var chartData = {
        labels: s4_months_labels,
        datasets: [{
            label: '每月关注直播间人数',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: s4_count_list,
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