var leftBut = document.getElementById("left");
var rightBtn = document.getElementById("right");
var center = document.getElementById("imgUl");
var imgNav = document.getElementById("imgNav");
var imgs = document.getElementsByClassName("img-item");
var imgNavs = document.getElementsByClassName("img-nav");
var imgLen = imgs.length;
var curIndex = 0;
var interval;
leftBut.onclick = function () {
    if (curIndex <= 0) {
        curIndex = imgLen - 1;
    } else {
        curIndex--;
    }
    changeTo(curIndex);
};
rightBtn.onclick = function () {
    if (curIndex >= imgLen - 1) {
        curIndex = 0;
    } else {
        curIndex++;
    }
    changeTo(curIndex);
};

center.onmouseover = function () {
    window.clearInterval(interval);
};

center.onmouseout = function () {
    runAuto();
};

imgNav.addEventListener('click', function (e) {
    var nodeName = e.target.nodeName;
    if (nodeName === 'LI') {
        var forValue = e.target.attributes['for'].value
        var index = forValue.substring(4) - 0;
        changeTo(index - 1)
    }
}, true)

function changeTo(index) {
    curIndex = index;
    var imgIndex = "item" + (index + 1);
    var imgCur = document.getElementById(imgIndex);
    for (var i = 0; i < imgLen; i++) {
        imgs[i].style.opacity = 0;
        imgNavs[i].className = "img-nav";
    }
    opictiyImg(imgCur);
    imgNavs[index].className = "img-nav selected";
}

function runAuto() {
    interval = window.setInterval(function () {
        if (curIndex >= imgLen - 1) {
            curIndex = 0;
        } else {
            curIndex++;
        }
        changeTo(curIndex);
    }, 3000);
}

function opictiyImg(imgEle) {
    var opVal = 0.4;
    var opInterval = window.setInterval(function () {
        if (opVal < 1) {
            opVal += 0.1;
            imgEle.style.opacity = opVal;
        } else {
            clearInterval(opInterval);
        }
    }, 100)
}

window.onload = function () {
    runAuto();
}
