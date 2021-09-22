(function init() {
    /**
     * production页面的相关逻辑
     * 主要还是生成时间轴节点
     */

        // 时间轴节点数据
    var timeNode = [
            {
                time: '2016年08月',
                name: '找月亮小游戏',
                desc: '之前自己用Java Swing做过一版，现在用js重做一个页面版',
                url: './boxGame.html'
            },
            {
                time: '2016年09月',
                name: '图片轮播',
                desc: '造造多种方法图片轮播轮子',
                url: '../../../childPage/pictureCarousel/index.html'
            },
            {
                time: '2017年02月',
                name: 'react+kendo UI+echarts',
                desc: '初次尝试react',
                url: '../../../childPage/myFirstReact/index.html'
            },
            {
                time: '2017年09月',
                name: 'my home',
                desc: '搭建一个自己的静态网站',
                url: 'http://www.xiaodoudou.xin'
            },
            {
                time: '2018年01月',
                name: 'hexo',
                desc: '搭建一个自己的blog',
                url: 'https://blog.xiaodoudou.xin/'
            },
            {
                time: '2019年02月',
                name: 'component-build(git)',
                desc: 'Angular构建一个特殊UI库',
                url: 'https://github.com/zhang121923/component-build'
            },
            {
                time: '2019年11月',
                name: 'electron-TODO(git)',
                desc: 'electron做了个仿window 10的To Do桌面程序',
                url: 'https://github.com/zhang121923/electron-TODO'
            },
            {
                time: '2020年03月',
                name: 'uni-clock(git)',
                desc: 'uni-app做一个仿华为闹钟应用',
                url: 'https://github.com/zhang121923/uni-clock'
            },
            {
                time: '2020年04月',
                name: 'my-home-v2(git)',
                desc: 'my-home主页整体重构，使用webpack+react+typescript架构搭建',
                url: 'https://github.com/zhang121923/my-home-v2'
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
                <div class="item-point iconfont">&#xe626;</div>
                <div class="item-content">
                    <span class="item-content-time">${node.time}</span>
                    <div class="item-content-info">
                        <a class="item-content-title" href="${node.url}" target="_blank"><strong>${node.name}</strong></a>
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
        for (var i = elements.length - 1; i >= 0; i--) {
            insertPoint.insertAdjacentElement('afterend', elements[i]);
        }
        // 删除template节点
        timeLine.removeChild(template);

        // 方式二
        // insertPoint.insertAdjacentHTML('beforebegin', strBuffer)
    }
})();
