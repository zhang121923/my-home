var leftBut = document.getElementById("left");
var rightBtn = document.getElementById("right");
var imgArea = document.getElementById("imgUl");
var imgNav = document.getElementById("imgNav");
var imgs = document.getElementsByClassName("img-item");
var imgNavs = document.getElementsByClassName("img-nav");
var imgLen = imgs.length;
// nav 元素的长度
var navElementWidth;
var runFlag = false;
var navInterval = null;
// 当前播放到第几个图片
var curIndex = 0;
var interval;
leftBut.onclick = function () {
    if (curIndex <= 0) {
        curIndex = imgLen - 1;
    } else {
        curIndex--;
    }
    forceChangeTo();
};
rightBtn.onclick = function () {
    if (curIndex >= imgLen - 1) {
        curIndex = 0;
    } else {
        curIndex++;
    }
    forceChangeTo();
};

imgArea.onmouseover = function () {
    window.clearInterval(interval);
};

imgArea.onmouseout = function () {
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

/**
 * 切换图片
 * @param index
 */
function changeTo(index) {
    curIndex = index;
    for (var i = 0; i < imgLen; i++) {
        imgNavs[i].className = "img-nav";
        imgNavs[i].children[0].style.width = '0px';
    }
    imgNavs[index].className = "img-nav selected";
    var navAnimation = document.querySelector('.selected').children[0];
    var curWidth = 0;
    if (runFlag && navInterval) {
        clearInterval(navInterval);
        runFlag = false;
    }
    navInterval = window.setInterval(function () {
        if (curWidth >= navElementWidth) {
            setTimeout(showImg, 0);
            clearInterval(navInterval)
        } else {
            curWidth += 10;
        }
        navAnimation.style.width = curWidth + 'px';
    }, 500);
}

function forceChangeTo() {
    runFlag = true;
    changeTo(curIndex);
}

function runAuto() {
    interval = window.setInterval(function () {
        if (curIndex >= imgLen - 1) {
            curIndex = 0;
        } else {
            curIndex++;
        }
        changeTo(curIndex);
    }, 4000);
}

function showImg() {
    // 偏移量
    var offset = curIndex === imgLen ? 0 : -100 * curIndex;
    imgArea.style.top = offset + '%';
}

window.onload = function () {
    navElementWidth = imgNavs[0].clientWidth;
    imgNavs[0].children[0].style.width = navElementWidth + 'px';
    runAuto();
}
