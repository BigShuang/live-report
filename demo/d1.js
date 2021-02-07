//  https://tobiasahlin.com/moving-letters/#10
var textWrapper = document.querySelector('.ml10 .letters');

var textWrapper = document.querySelector('.ml13');

textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//anime.timeline({loop: false})
//    .add({
//        targets: '.ml10 .letter',
//        rotateY: [-90, 0],
//        duration: 1000,
//        delay: (el, i) => 70 * i
//    });

anime.timeline({loop: true})
  .add({
    targets: '.ml13 .letter',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => 300 + 100 * i
  });