var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    //初始状态
    $scope.state = {
        isActiveAbout: false,
        isActiveIntro: false,
        isShowDesc: false
    };

    // temp
    var screenWidth = document.documentElement.clientWidth;
    if (screenWidth < 980) {
        document.querySelector('.header-visible').style.display = 'none';
    } else {
        document.querySelector('.header-visible').style.display = 'block';
    }

    // 菜单项
    $scope.menuList = [
        {
            title: 'hope`s Blog',
            content: '个人博客,写写记记,做一个进击的coder',
            href: 'http://www.xiaodoudou.xin'
        }, {
            title: '爱生活，爱音乐',
            content: '小小的那么展示一下我才艺，哈哈',
            href: ''
        }, {
            title: '新的旅途',
            content: 'You can either travel or read,but either your body or soul must be on the way。这里我选择身体在路上，鄙人不会拍照，仅仅作为留念',
            href: './app/html/travel/index.html'
        }, {
            title: '随笔',
            content: '小时候听大人说写日记是为以后怀念过去的',
            href: ''
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
        nextPage: function (index, e) {
            e.preventDefault();
            // 页码
            var pageNum = index = index === 4 ? 0 : index + 1;
            // 获取将要展示的页面element
            var nextIndex = pageNum + 1;
            var next = document.querySelector('.kind-item-' + nextIndex);
            // 所有的页集合
            var pages = document.querySelectorAll('.page-item');
            Array.prototype.forEach.call(pages, function (item, i) {
                if(i === index) {
                    item.style.zIndex = '5';
                }else {
                    item.style.zIndex = '0';
                }
            });
        }
    }
});
