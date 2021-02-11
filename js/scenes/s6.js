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
        return
    }else if(s6_captain_names.length == 1) {
        show_one_captain()
        anime.timeline({loop: false})
            .add({
                targets: '.s6-cc',
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 2000,
            })
    }else if(s6_captain_names.length > 1) {
        show_aboard()
        // 大航海特写， 让船员慢慢出现
        anime.timeline({loop: false})
            .add({
                targets: '.s6-cc .captain-info',
                opacity: [
                    { value: [0, 1], duration: 400, easing: 'linear'},
                    { value: [1, 1], duration: 300 + S6_DANMU_DURATION, easing: 'linear'},
                    { value: [1, 0], duration: 330, easing: 'linear'}
                ],
                easing: "linear",
                // duration: 2000,
                delay: (el, i) => 1400 + (1000 + S6_DANMU_DURATION) * i
            }).add({
                targets: '.s6-cc .captain-info',
                opacity: 1,
                easing: "linear",
                duration: 500,
            })

        anime.timeline({loop: false})
            .add({
                targets: '#s6-board .captain-static-danmuku',
                opacity: [
                    { value: [0, 1], duration: 200, easing: 'linear'},
                    { value: [1, 1], duration: 600 + S6_DANMU_DURATION, easing: 'linear'},
                    { value: [1, 0], duration: 200, easing: 'linear'}
                ],
                easing: "linear",
                // duration: 2000,
                delay: (el, i) => 1400 + (1000 + S6_DANMU_DURATION) * i
            })
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
        var ci = i % COLORS6.length;
        var div = document.createElement("div");
        div.setAttribute('class', 'captain-info');
        get_fit_size(s6_captain_names.length, div)
        div.innerHTML = '<span style="background: '+ COLORS6[ci] +'80; color: #fff">&nbsp;' +
            s6_captain_ranks[i] + '&nbsp;</span>' + 
            '<span style="color: '+ COLORS6[ci] +'80">&nbsp;' +
            s6_captain_names[i] + '&nbsp;</span>'
        document.getElementById("s6-cc").appendChild(div);
    }

    add_static_danmu()
}


function get_fit_size(len, div){
    // return fontSize, lineHeight
    if(len<=10){
        div.style["fontSize"] = "28px"
        div.style["lineHeight"] = 1.5
    }else if(len<=12){
        div.style["fontSize"] = "26px"
        div.style["lineHeight"] = 1.4
    }else if(len<=13){
        div.style["fontSize"] = "24px"
        div.style["lineHeight"] = 1.3
    }else if(len<=15){
        div.style["fontSize"] = "22px"
        div.style["lineHeight"] = 1.2
    }else{
        div.style["fontSize"] = "20px"
        div.style["lineHeight"] = 1.1
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


function add_static_danmu(){
    var wh = window.innerHeight, 
        ww = window.innerWidth;

    var i = 0;
    var locations = [
        // x(left), y(top)
        [400, 50], [200, 140], [150, 220], [220, 360], [120, -200], [140, -100],
        [-250, 80], [-200, 150], [-150, 240], [-180, 340], [-120, -250], [-140, -150],
    ]

    for(var ri=0; ri < s6_captain_danmus.length; ri++){
        var pdiv = div = document.createElement("div");
        pdiv.setAttribute('class', 'captain-static-danmuku captain-'+ri + '-danmuku');
        for(var j=0; j < s6_captain_danmus[ri].length && j < locations.length && j< S6_DANMU_MAXNUM_2; j++){
            var div = document.createElement("div");
            div.setAttribute('class', 'static-danmuku captain-'+ri);
            
            var danmu = s6_captain_danmus[ri][j]

            if(locations[j][0]>0){
                div.style.left = locations[j][0] + "px";
            }else{
                div.style.left = (ww + locations[j][0] - danmu.length * 24) + "px";
            }

            if(locations[j][1]>0){
                div.style.top = locations[j][1] + "px";
            }else{
                div.style.top = (wh + locations[j][1] - 24) + "px";
            }

            div.style.color = COLORS2[ri]

            div.innerHTML = danmu
            pdiv.appendChild(div);
        }
        document.getElementById("s6-board").appendChild(pdiv);
    }
}