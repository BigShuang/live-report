function turn_page_6() {
    anime.timeline({loop: false})
        .add({
            targets: '.s5-chart',
            translateX: [0, -1500],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });

    anime.timeline({loop: false})
        .add({
            targets: '#s5-board',
            opacity: [1, 0],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });   
}


function show_page_6() {
    if(s6_captain_names.length == 0){
        return
    }else if(s6_captain_names.length == 1) {
        show_one_captain()
    }else if(s6_captain_names.length > 1) {
        show_aboard()
    }

    anime.timeline({loop: false})
        .add({
            targets: '#s5-title .dynamic-letters',
            translateY: [0, -100],
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) => 40 * i
        })
        .add({
            targets: '#s6-title .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) =>  50 * i
        });
    
    // for 大航海特写， 让船员慢慢出现
    anime.timeline({loop: false})
        .add({
            targets: '.s6-cc',
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 2000,
        })
}

function show_one_captain() {
    document.getElementById('s6-letters-1').innerHTML= s6_captain_ranks[0].replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');
    document.getElementById('s6-super-star').innerHTML= s6_captain_names[0]
    document.getElementById('s6-letters-2').innerHTML= "特写".replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');
    
    add_roll_danmu()
}


function show_aboard() {
    document.getElementById('s6-letters-3').innerHTML= "大航海特写".replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');

    for(var i = 0; i < s6_captain_names.length; i++) {
        var div = document.createElement("div");
        div.setAttribute('class', 'captain-info');
        div.innerHTML = '<span style="background: '+ COLORS2[i] +'80; color: #fff">&nbsp;' +
        s6_captain_ranks[i] + '&nbsp;</span>' + s6_captain_names[i];
        document.getElementById("s6-cc").appendChild(div);
    }
}


function add_roll_danmu() {
    var danmu_length = []  // record the danmu length in one row to avoid overlying
    var danmus_copy = s6_captain_danmus[0].concat();  // a array to copy s6_captain_danmus

    for(var di=0; di < S6_DANMU_MAXNUM && di < danmus_copy.length; di++) {
        var danmu = danmus_copy[di];
        var div = document.createElement("div");

        div.setAttribute('class', 'rolling-danmuku');

        if(danmu_length.length>=DANMU_LEVEL){
            top_index = danmu_length.indexOf(Math.min(...danmu_length));
        }else{
            top_index = danmu_length.length
        }

        // var top_index = Math.floor(Math.random() * DANMU_LEVEL)
        div.style.top = 150 + top_index * 36 + "px";

        danmu_length[top_index] = danmu_length[top_index] == undefined ? Math.floor(Math.random() * (di % 12)) * 20 : danmu_length[top_index]
                
        div.style.left = danmu_length[top_index] + "px";
        danmu_length[top_index] += danmu.length * 40 + 150;
        
        div.style.color = COLORS2[di % COLORS2.length]

        div.innerHTML =  danmu;  
        
        document.getElementById("s6-board").appendChild(div);
    }

    // var max_danmu_length = Math.max(...danmu_length) * 30;
    var max_danmu_length = Math.max(...danmu_length);
    console.log(max_danmu_length)

    anime.timeline({
        easing: custom_easing,
        // easing: "linear",
        duration: (window.innerWidth + max_danmu_length) * 5,
        // delay: (el, i) =>  200 * i ,
        loop: true
    }).add({
        targets: '#s6-board .rolling-danmuku',
        translateX: [window.innerWidth, -max_danmu_length],
        opacity: 1,
    })
    
}