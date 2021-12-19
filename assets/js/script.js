let menu = document.querySelector('#menu-btn');
let header = document.querySelector('.header');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');

}

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () =>{
    themeToggler.classList.toggle('fa-sun');
    if(themeToggler.classList.contains('fa-sun')){
        document.body.classList.add('active');

    }else{
        document.body.classList.remove('active');
    }
}

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

// Team react

'use strict'
var team = document.getElementById("team"),
teamDots = Array.prototype.slice.call(document.getElementById("team-dots").children),
teamContent = Array.prototype.slice.call(document.getElementById("team-content").children),
teamSpeed = 4500,
currentSlide = 0,
currentActive = 0,
teamTimer
;

window.onload = function () {



    function playSlide(slide) {
        for (var k = 0; k < teamDots.length; k++) {
            teamContent[k].classList.remove("active");
            teamContent[k].classList.remove("inactive");
            teamDots[k].classList.remove("active");
        }
        if (slide < 0) {
            slide = currentSlide = teamContent.length - 1;
        }
        if (slide > teamContent.length - 1) {
            slide = currentSlide = 0;
        }
        if (currentActive != currentSlide) {
            teamContent[currentActive].classList.add("inactive");
        }
        teamContent[slide].classList.add("active");
        teamDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(teamTimer);
        teamTimer = setTimeout(function () {
            playSlide(currentSlide += 1 );
        }, teamSpeed)
    }
        
    for (var l = 0; l < teamDots.length; l++) {
        teamDots[l].addEventListener("click", function () {
            playSlide(currentSlide = teamDots.indexOf(this));
        })
    }
    playSlide(currentSlide);
}