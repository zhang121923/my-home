(function init() {
    /**
     * production页面的相关逻辑
     * 主要还是生成时间轴节点
     */

        // 时间轴节点数据
    var timeNode = [
            {
                time: '2016-08-01',
                name: '找月亮小游戏',
                desc: '之前自己用Java Swing做过一版，现在用js重做一个页面版',
                url: './boxGame.html'
            },
            {
                time: '2016-09-01',
                name: '图片轮播',
                desc: '造一个图片轮播的轮子',
                url: 'http://zhang121923.coding.me/picture-carousel/'
            },
            {
                time: '2017-02-01',
                name: 'react+kendo UI+echarts',
                desc: '初次尝试react',
                url: '../../../childPage/myFirstReact/index.html'
            }
        ];

    window.onload = function () {

        // 插入节点
        var timeLine = document.querySelector('.time-axies-line');
        var insertPoint = document.querySelector('#insertPoint');
        var template = document.querySelector('#timeTemplate');

        // 执行插入
        var strBuffer = '';
        timeNode.forEach(function (node) {
            strBuffer += `
            <div class="item">
                <div class="item-point"></div>
                <div class="item-content">
                    <span class="item-content-time">${node.time}</span>
                    <div class="item-content-info">
                        <a class="item-content-title" href="${node.url}" target="_blank">${node.name}</a>
                        <small class="item-content-description">${node.desc}</small>
                    </div>
                </div>
            </div>
            `;
        });


        // 方式一
        template.innerHTML = strBuffer;
        // 获取节点element元素
        var elements = template.content.children;
        // 插入
        for (var i = elements.length - 1;  i >= 0; i--) {
            insertPoint.insertAdjacentElement('afterend', elements[i]);
        }
        // 删除template节点
        timeLine.removeChild(template);

        // 方式二
        // insertPoint.insertAdjacentHTML('beforebegin', strBuffer)
    }
})();
