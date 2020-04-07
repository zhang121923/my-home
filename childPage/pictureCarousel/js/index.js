(function carousel() {
    /**
     * 轮播首页显示
     */
    carouselList = [
        {
            index: 1,
            url: './module/m1.html'
        },
        {
            index: 2,
            url: './module/m2.html'
        }
    ];

    window.onload = function () {
        iframe = document.querySelector('.frame-content');
        tabList = document.querySelectorAll('.tab-item');

        // 初始设置
        toggleTab(0);
    }
})();


/**
 * 切换tab
 */
function toggleTab(index) {
    iframe.src = carouselList[index].url;
    Array.prototype.forEach.call(tabList, function (item) {
        item.className = 'tab-item';
    })
    tabList[index].className = 'tab-item selected';
}
