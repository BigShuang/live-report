function click_scene(event) {
    if (event.button==0) {
        UR_PAGE += 1
        play()
    }
}


document.onmousedown = function (event) { 
    if (event.button == 0 && CLICK_ENTER_NEXT) { 
        CUR_PAGE += 1
        play()
    } 
} 

document.onkeydown = function (e) {
    // console.log(e.key)
    // console.log(e.code)

    if(e.key=="ArrowRight" || (NEXT_PAGE_KEY != undefined && e.key == NEXT_PAGE_KEY) ){
        CUR_PAGE += 1
        play()
    }
};


function play() {
    if(CUR_PAGE==0){
        show_page_0()
    }
    if(CUR_PAGE==1){
        turn_page_1()
        show_page_1()
    }else if(CUR_PAGE==2){
        turn_page_2()
        show_page_2()
    }else if(CUR_PAGE==3){
        turn_page_3()
        show_page_3()
    }else if(CUR_PAGE==4){
        turn_page_4()
        show_page_4()
    }else if(CUR_PAGE==5){
        turn_page_5()
        show_page_5()
    }else if(CUR_PAGE==6){
        turn_page_6()
        show_page_6()
    }else if(CUR_PAGE==7){
        turn_page_7()
        show_page_7()
    }
}

window.onload = function(){
    play()
}


function show_page_0() {
    document.getElementById('s0-super-star').innerHTML = UP_NAME.replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');
        
    var textWrapper = document.querySelector('#s0-letters');
    var prefix_text = "2020个人直播年报"
    textWrapper.innerHTML = prefix_text.replace(/\S/g,
        '<span class="dynamic-letters">$&</span>');

    anime.timeline({loop: false})
        .add({
            targets: '#s0-title .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 60,
            delay: (el, i) =>  100 + 40 * i
        });

}