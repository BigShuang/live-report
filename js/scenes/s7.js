function turn_page_7() {
    anime.timeline({loop: false})
        .add({
            targets: '.s6-cc',
            opacity: [1, 0],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });

    anime.timeline({loop: false})
        .add({
            targets: '#s6-title',
            opacity: [1, 0],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });  
    anime.timeline({loop: false})
        .add({
            targets: '#s6-board',
            opacity: [1, 0],
            translateY: 0,
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });
}


function show_page_7() {
    if(poems["display"] && poems["emotion"] != undefined && poems["name"] != undefined && poems["author"] != undefined 
        && poems["lines"] != undefined && poems["lines"].length > 0){
        document.getElementById('s7-letters-2').innerHTML= gratitude.replace(/\S/g,
            '<span class="dynamic-letters">$&</span>');

        document.getElementById('s7-letters-3').innerHTML= poems["emotion"].replace(/\S/g,
            '<span class="dynamic-letters">$&</span>');
        
        for(var i = 0; i<poems["lines"].length; i++){
            var div = document.createElement("div");
            div.setAttribute('class', 'poems-lines');
            div.innerHTML = poems["lines"][i].replace(/\S/g,
                '<span class="dynamic-letters">$&</span>');
            document.getElementById("s7-cc").appendChild(div);
        }

        var div = document.createElement("div");
        div.setAttribute('class', 'poems-title');
        div.innerHTML = poems["name"] + "  ——  " + poems["author"]
        document.getElementById("s7-cc").appendChild(div);
    }else{
        document.getElementById('s7-letters-1').innerHTML= gratitude.replace(/\S/g,
            '<span class="dynamic-letters">$&</span>');
    }
    
    if(! ONLY_POEMS){
        anime.timeline({loop: false})
        .add({
            targets: '#s7-title .dynamic-letters',
            opacity: [0,1],
            duration: 1000,
            delay: (el, i) =>  20 * i
        });
    }

    anime.timeline({loop: false})
        .add({
            targets: '#s7-cc .dynamic-letters',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: (el, i) => 800 + 150 * i
        }).add({
            targets: '#s7-cc .poems-title',
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
        })
    
    
}