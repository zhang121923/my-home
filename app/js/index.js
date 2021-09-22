var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    //初始状态
    $scope.state = {
        isActiveAbout: false,
        isActiveIntro: false,
        isShowDesc: false,
        pageNum: 1 // 初始页数是1
    };

    // 监听DOM完成
    $scope.$watch('$viewContentLoaded', function () {
        var screenWidth = document.documentElement.clientWidth;
        if (screenWidth < 980) {
            document.querySelector('.header-visible').style.display = 'none';

            // 移动端禁止滚动页面
            document.documentElement.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
            document.querySelector('.center-content').addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false)
        } else {
            document.querySelector('.header-visible').style.display = 'block';
        }
    })

    // 菜单项
    $scope.menuList = [
        {
            title: 'hope`s Blog',
            content: '个人博客,写写记记,做一个进击的coder',
            href: 'http://blog.xiaodoudou.xin/'
        }, {
            title: '爱生活，爱音乐',
            content: '还记得犬夜叉里《穿越时空的思念》吗?',
            href: './app/html/doudou/index.html'
        }, {
            title: '新的旅途',
            content: 'You can either travel or read,but either your body or soul must be on the way。仅仅作为留念',
            href: './app/html/travel/index.html'
        }, {
            title: '随笔',
            content: '小时候听大人说写日记是为以后怀念过去的',
            href: 'https://blog.xiaodoudou.xin/categories/%E9%9A%8F%E7%AC%94/'
        }, {
            title: '小作品',
            content: '有时并不知道自己这么能创造',
            href: './app/html/production/index.html'
        },
    ];

    //事件
    $scope.events = {
        show: function (type) {
            if (type == 'isActiveAbout') {
                $scope.state.isActiveIntro = false;
            } else {
                $scope.state.isActiveAbout = false;
            }
            $scope.state[type] = !$scope.state[type];
        },
        /**
         * 菜单切换逻辑
         */
        toggleDesc: function () {
            // 切换介绍菜单显示隐藏
            var headerEle = angular.element(document.querySelector('.header-visible'))[0];
            var display = headerEle.style.display;
            headerEle.style.display = display === 'none' ? 'block' : 'none';

            // 显示时默认显示关于项， 关闭是触发两项隐藏
            if (display === 'none') {
                $scope.state.isActiveAbout = true;
            } else {
                $scope.state.isActiveAbout = false;
                $scope.state.isActiveIntro = false;
            }

            // 切换按钮显示
            $scope.state.isShowDesc = !$scope.state.isShowDesc;
        },
        /**
         * 下页逻辑
         * @param index
         */
        nextPage: function (e) {
            e.preventDefault();
            // 获取第一个a page页，根据偏移量设置其绝对位置，下面的元素会自动上下移
            var item1 = document.querySelector('.center-content');
            // 计算偏移量，pageNum从1开始，所以偏移量是- pageNum * 100%,
            // 当pageNum === $scope.menuList.length时，返回第一页，即偏移量回复0
            var offsetY = $scope.state.pageNum === $scope.menuList.length ? 0 : -$scope.state.pageNum * 100;
            item1.style.top = offsetY + '%';
            // 更改pageNum
            $scope.state.pageNum = $scope.state.pageNum === $scope.menuList.length ? 1 : ++$scope.state.pageNum;
        }
    }
});
