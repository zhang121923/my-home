(function () {
    var bgSrc = '/my-blog/app/img/travel/travelbg.jpg';
    var title = "   要么读书要么旅行,灵魂与肉体总有一个在路上";
    var titleCount = 1;
    var stopIndex = -1;
    var mainTitle;
    window.onload = function () {
        mainTitle = document.querySelector('#mainTitle');
        loadBgImg();
        setInterval(loadTitle, 200);
        loadImg();
    };
    function loadBgImg() {
        document.querySelector('.bg').style.backgroundImage = 'url(' + bgSrc + ')';
    }

    function loadImg() {
        var all_img_tag = document.getElementsByTagName('img');
        for (var i = 0, len = all_img_tag.length; i < len; i++) {
            if (all_img_tag[i].getAttribute('data-src')) {
                var src_dist = all_img_tag[i].getAttribute('data-src');
                all_img_tag[i].setAttribute('src', src_dist);
            }
        }
    }

    function loadTitle() {
        if (stopIndex === -1) {
            if (title[titleCount - 1] === ',') {
                stopIndex = titleCount;
                while (titleCount > -1) {
                    mainTitle.innerText = title.substr(0, titleCount--);
                }
            }
            mainTitle.innerText = title.substr(0, titleCount++);
        } else {
            mainTitle.innerText = title.substr(stopIndex, titleCount++);
        }
        if ((stopIndex + titleCount) >= title.trim().length) {
            mainTitle.className = "";
        } else {
            if (titleCount % 2 === 0) {
                mainTitle.className = "";
            } else {
                mainTitle.className = "spin";
            }
        }
    }
})(window, document);

function showDetailImg(index) {
    var content = document.getElementsByClassName('content')[0];
    content.style.display = "none";
    var book = document.getElementById("book");
    var close = document.getElementById("closeDetail");
    book.style.display = "inline-block";
    close.style.display = "block";
    var pages = book.getElementsByTagName("div");
    var pageNumber = 4, rota = -180;
    var originLeft = book.style.left;
    book.onclick = function () {
        book.style.left = "40%";
        pages[pageNumber].style.transform = "rotateY(" + rota + "deg)";
        pageNumber--;
        rota += 10;
        if (pageNumber < 0) {
            for (var i = 0; i < pages.length; i++) {
                pages[i].style.transform = "rotateY(0deg)";
            }
            book.style.left = originLeft;
            pageNumber = 4;
            rota = -180;
        }
    }
}

function closeDetail() {
    var content = document.getElementsByClassName('content')[0];
    content.style.display = "block";
    var book = document.getElementById("book");
    var close = document.getElementById("closeDetail");
    book.style.display = "none";
    close.style.display = "none";
}